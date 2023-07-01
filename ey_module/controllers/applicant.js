const fs = require('fs');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const waterfall = require('async-waterfall');
const cloudinary = require('cloudinary');
const async = require('async');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { Applicant, validateApplicant } = require('../mongo_handler/applicant');
const spark = require('../global_vars/sparkpost.js');
const uniqueId = require('../global_vars/uniqueId');
const Candidate = require('../mongo_handler/candidate');
const Recruiter = require('../mongo_handler/user');

const uploadToCloudinary = require('../global_vars/helper');
/* cloudinary.config({    cloud_name: 'dpijyjulg',    api_key: '344142488787362',    api_secret: 'E6textvz7MZkvU4H-zw4L2Ybxmw'
});   */
cloudinary.config({
  cloud_name: 'dtgvxijvw',
  api_key: '651743287142786',
  api_secret: '9v4R33o5KkDGhcsCSEd_Et4ceKw',
});

function validate(req) {
  const schema = {
    email_id: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(req, schema);
}

const candidate_api = {
  ping: function(req, res) {
    res.status(200).send('OK');
  },

  getDetails: async function(req, res) {
    const applicant = await Applicant.findOne({
      _id: mongoose.Types.ObjectId(req.params._id),
    });
    res.send(applicant);
  },

  signup: async function(req, res) {
    //  console.log('signup form data: ', req.body);
    const { error } = validateApplicant(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Applicant.findOne({ email_id: req.body.email_id });
    if (user) return res.status(400).send('User already registered.');
    // generate unique id
    req.body.unique_id = uniqueId();
    if (req.body.cv.value) {
      // const pdf_base64 = req.body.cv.value;      // const binaryData = new Buffer(pdf_base64, 'base64');      // let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
      let randomNumber = req.body.unique_id;
      let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
      let fileExt = req.body.cv.filename
        .split('.')
        .pop()
        .toLowerCase();
      if (allowedExt.includes(fileExt)) {
        try {
             let resumeName = req.body.cv.filename;
          let resumeFileName = `resume_${randomNumber}`;
          let startingPath = path.join(__dirname, "../..");
          let resume_path_db =  `${startingPath}/public/candidate_resume/${resumeFileName}.${fileExt}`;
          let resume_path = `http://b2b.peopleinfinia.in/cdn/candidate_resume/${resumeFileName}.${fileExt}`;
          let buff = new Buffer(req.body.cv.value, 'base64');
           fs.writeFileSync(resume_path_db, buff,async(err)=>{
            if(err)
            return res
            .status(500)
            .send(
              `Error in uploading resume.`);
              else
              await console.log('done');
          });
          const Cv_details = {
            resumeName,
            resumeFileName,
            resume_path
          }
          if (Cv_details) {
            delete req.body.cv;
            req.body.cv = Cv_details;
          }
        } catch (err) {
          console.log('Error in Uploading CV ', err);
          delete req.body.cv;
        }
      } else {
        return res
          .status(400)
          .send(
            `Uploaded resume is not allowed file type. Please upload ${allowedExt.join(
              ', '
            )} only.`
          );
      }
    } else delete req.body.cv;

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // req.body.email_verified = true;
    req.body.timeline = [
      {
        action: 'signup',
        status: 'completed',
        date: Date.now(),
      },
    ];
// console.log("details",req.body);

    user = new Applicant(req.body);
    user.save(function(err) {
      // console.log('user save: ', user);
      // send account verification mail to user
      const htmlContent = spark.getApplicantVerificationMailHtml(
        user.name,
        user._id
      );
      spark
        .send(
          'noreply@peopleinfinia.com',
          req.body.email_id,
          'Account verificaion',
          htmlContent,
          ''
        )
        .then(function(result) {
          if (err) {
            console.log('spark email send error: ', err);

            res
              .status(500)
              .send('Something went wrong! Please try again.', err);
     let userDel =  Applicant.findOneAndDelete({ 'email_id':result.email_id });

          } else {
            const token = user.generateAuthToken();
            // res.status(200).header('x-auth-token', token).send('Please check your email and activate the link.');
            res.status(200).send({
              responseCode: 200,
              responseMessage: 'Please check your email and activate the link.',
              result: user,
              token,
            });
          }
        });
    });
  },













  uploadVideoCv: async function(req, res) {
    console.log("video",req.body.idUser);
    // let mainTaskIdDummy = uuid()
    
    // console.log("11video",req.body);
    // let randomNumber = mainTaskIdDummy +'-'+ req.user._id;
    let randomNumber = req.body.idUser;
    req.params._id = req.body.idUser;

    let dpName = `VideoCv_${randomNumber}`;
    let startingPath = path.join(__dirname, "../..");

    let fileExt = req.body.videoCv.filename.split('.').pop().toLowerCase();
    let video_path_db =  `${startingPath}/public/user_video_cv/${dpName}.${fileExt}`;

    let videoCvPath = `https://peopleinfinia.in/cdn/user_video_cv/${dpName}.${fileExt}`;
    let buff = new Buffer(req.body.videoCv.value, 'base64');
   console.log("buff",buff,req.params._id)

    fs.writeFileSync(video_path_db, buff,async(err)=>{
     if(err)
     return res
     .status(500)
     .send(`Error in uploading resume.`);
       else
       await console.log('done');
   });
   console.log("output",video_path_db,videoCvPath)
    Applicant.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      { $set: { videoCv: videoCvPath } },
      { new: true },
      function(err, finalResult) {
        if (err) {
          res
            .status(500)
            .send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          res.status(200).send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: finalResult,
          });
        }
      }
    );
    // res.send("backend res");
  },

  forget_password: function(req, res) {
    Applicant.findOne({ email_id: req.body.email_id }, function(err, result) {
      if (err) {
        return res.send({ responseCode: 500, responseMessage: 'server err' });
      } else if (!result) {
        return res.send({
          responseCode: 400,
          responseMessage: 'Please enter correct email id.',
        });
      } else {
        function randomString(length, chars) {
          var result = '';
          for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
          return result;
        }
        var rString = randomString(
          8,
          '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        );
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(rString, salt);
        // var htmlContent=mailTemp.style+mailTemp.content_start1+functions.getforgot(req.body.email,rString)+mailTemp.content_end4;
        var htmlContent = spark.forgetMailHtml(
          result.user_name,
          result.email_id,
          rString
        );
        spark
          .send(
            'noreply@peopleinfinia.com',
            req.body.email_id,
            'Forgot password',
            htmlContent,
            ''
          )
          .then(function(result) {
            if (!result.status) {
              return res.send({
                responseCode: 400,
                responseMessage: 'mail Not sent!',
              });
            } else {

              Applicant.update(
                { email_id: req.body.email_id },
                { $set: { password: password } },
                function(err, result2) {
                  // res.json({ status: true, response : 'please check your mail inbox.'})
                  return res.send({
                    responseCode: 200,
                    responseMessage: 'Please check your mail inbox.',
                  });
                }
              );
            }
          });
      }
    });
  },

  account_verification: function(req, res) {
    Applicant.findOne(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else if (result.email_verified == true) {
          res.send({
            responseMessage: 'Already Verified!!!',
            responseCode: 204,
          });
        } else {
          let toUpdate = { email_verified: true, status: 'active' };
          let timeline = {
            action: 'email-verification',
            status: 'completed',
            date: Date.now(),
          };

          Applicant.update(
            { _id: mongoose.Types.ObjectId(req.params._id) },
            { $set: toUpdate, $push: { timeline } },
            function(err, finalResult) {
              res.redirect('https://peopleinfinia.com/');
            }
          );
        }
      }
    );
  },

  login: async function(req, res) {
    // console.log('req.body', req.body);
    // validate email and password
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find user by provided email id
    let user = await Applicant.findOne({ email_id: req.body.email_id });
    // console.log('user: ', user);
    if (!user) return res.status(400).send('Invalid email or password.');

    // if password doesn't match
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send('Invalid password.');

    // if user's email is not verified.
    if (!user.email_verified)
      return res
        .status(400)
        .send('Email is not verified. Please verify email first.');

    // log user's login time
    await Applicant.update(
      { _id: mongoose.Types.ObjectId(user._id) },
      { $set: { is_first_login: true, last_login_at: Date.now() } }
    );
    const token = user.generateAuthToken();
    res.status(200).send({
      responseCode: 200,
      responseMessage: 'Login successful',
      result: user,
      token,
    });
  },

  loginWithGoogle: async function(req, res) {
    // console.log('req.body', req.body);

    // find user by provided email id
    var { idToken,email } = req.body;
    https.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+idToken,async (resp) => {
      let data='';
      resp.on('data', (chunk) => {
          data += chunk;
        });
      resp.on('end',async () => {
       data = JSON.parse(data);
      //  console.log("data",data)
       if( data.email_verified =='true' )
       {
    // find user by provided email id
    let user = await Applicant.findOne({ email_id: req.body.email });
    // console.log('user: ', req.body);
    if (!user) //return res.status(400).send('Email is not registered.');
    {
      let applicant_data = { email_id : req.body.email, name : req.body.name, profile_pic : req.body.photoUrl };
      user = new Applicant(applicant_data);
      user.save(function(err){
       if(err)
       return res.status(500),send({
         responseCode: 500,
         responseMessage : 'Server Error'
       })
      })
    }

    // log user's login time
    await Applicant.update(
      { _id: mongoose.Types.ObjectId(user._id) },
      { $set: { is_first_login: true, last_login_at: Date.now() } }
    );
    const token = user.generateAuthToken();
    res.status(200).send({
      responseCode: 200,
      responseMessage: 'Login successful',
      result: user,
      token,
    });
  }
})
    })
  },

  loginWithFB: async function(req, res) {
    // console.log('req.body', req.body);

    // find user by provided email id
    var { authToken,id,email } = req.body;
    https.get('https://graph.facebook.com/me?access_token='+authToken,async function (resp) {
        let data='';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end',async () => {
          data = JSON.parse(data);
         if( id === data.id ){
          let user = await Applicant.findOne({ email_id: email });
          if (!user) //return res.status(400).send('Email is not registered.');
          {
            let applicant_data = { email_id : req.body.email, name : req.body.name, profile_pic: req.body.photoUrl };
            user = new Applicant(applicant_data);
           user.save(async function(err){
             if(err)
             return res.status(500),send({
               responseCode: 500,
               responseMessage : 'Server Error'
             })
            })
          }
          // if user's email is not verified.

          // log user's login time
          else{
            await Applicant.updateOne(
              { _id: mongoose.Types.ObjectId(user._id) },
              { $set: { is_first_login: true, last_login_at: Date.now() } }
            );
            const token = user.generateAuthToken();
            res.status(200).send({
              responseCode: 200,
              responseMessage: 'Login successful',
              result: user,
              token,
            });
          }

         }
        });
      })
  },
  interview_training: async function(req, res) {
    console.log("req mail",req.body)
    var type = 'interview_training';
    var userObject = {
      name: req.body.name,
      mobile: req.body.mobile,
      email: 'peopleinfinia@gmail.com',
      UserEmail: req.body.email_id
    }
    nodemail.nodeMail(userObject, type, async (err, info) => {
      if (err) {
        res.status(400).send('Error in sending mail.');
  
       }
      else {
        res.status(200).json({
          responseCode: 200,
          // result: user,
        
          responseMessage: 'Thank you for your response. Our team will connect with you shortly',
        })
      }
    });
  

},
VideoAssistance: async function(req, res) {
  console.log("req mail",req.body)

  var type = 'VideoAssistance';
  var userObject = {
    name: req.body.name,
    mobile: req.body.mobile,
    email: 'peopleinfinia@gmail.com',
    UserEmail: req.body.email_id
  }
  nodemail.nodeMail(userObject, type, async (err, info) => {
    if (err) {
      res.status(400).send('Error in sending mail.');

     }
    else {
      res.status(200).json({
        responseCode: 200,
        // result: user,
       
        responseMessage: 'Thank you for your response. Our team will connect with you shortly',
      })
    }
  });
           
   
  
  

},
  edit_profile: async function(req, res) {
    // console.log('edit_profile > req.params: ', req.params);
    // console.log('edit_profile > req.body: ', req.body);

    // req.params._id = req.user._id;
    req.params.unique_id = req.user.unique_id;
    delete req.body._id;

    // if cv is set then check if cv already exist and replace it with new one.
    if (req.body.cv && req.body.cv.value) {

      // const pdf_base64 = req.body.cv.value;
      // const binaryData = new Buffer(pdf_base64, 'base64');

      // let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
      let randomNumber = req.params.unique_id;
      let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
      let fileExt = req.body.cv.filename
        .split('.')
        .pop()
        .toLowerCase();

      if (allowedExt.includes(fileExt)) {
        try {
          // const cloudinaryUrl = await uploadToCloudinary(
          //   resumeFileName,
          //   resumeFileNameWithPath,
          //   binaryData
          // );
          let startingPath = path.join(__dirname, "../..");
          let resumeName = req.body.cv.filename;
          let resumeFileName = `resume_${randomNumber}`;
          let resume_path_db =  `${startingPath}/public/candidate_resume/${resumeFileName}.${fileExt}`;
          let resume_path = `http://b2b.peopleinfinia.in/cdn/candidate_resume/${resumeFileName}.${fileExt}`;
          let buff = new Buffer(req.body.cv.value, 'base64');
          console.log(resumeName,resumeFileName,resume_path_db);
           fs.writeFileSync(resume_path_db, buff,async(err)=>{
            if(err)
            return res
            .status(500)
            .send(
              `Error in uploading resume.`);
              else
              await console.log('done');
          });
          const Cv_details = {
            resumeName,
            resumeFileName,
            resume_path
          }
          if (Cv_details) {
            delete req.body.cv;
            req.body.cv = Cv_details;
          }
        } catch (err) {
          console.log('uploadToCloudinary error: ', err);
          delete req.body.cv;
        }
      } else {
        return res
          .status(400)
          .send(
            `Uploaded resume is not allowed file type. Please upload ${allowedExt.join(
              ', '
            )} only.`
          );
      }
    } else delete req.body.cv;

    // profile pic upload
    console.log(`req.body.profile_pic:`);
    if (req.body.profile_pic && req.body.profile_pic.value) {
      // let base64Value = req.body.profile_pic.value;
      // let binaryData = new Buffer(base64Value, 'base64');
       console.log()
      // expecting unique_id in request
      let allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
      let fileExt = req.body.profile_pic.filename
        .split('.')
        .pop()
        .toLowerCase();

      if (allowedExt.includes(fileExt)) {
        try {
          // let cloudinaryUrl = await uploadToCloudinary(
          //   fileName,
          //   fileNameWithPath,
          //   binaryData
          // );
          let startingPath = path.join(__dirname, "../..");
          let randomNumber = req.params.unique_id;
          let dpName = `dp_${randomNumber}`;
          let profile_pic_db =  `${startingPath}/public/user_profile_pic/${dpName}.${fileExt}`;
          let profile_pic = `http://b2b.peopleinfinia.in/cdn/user_profile_pic/${dpName}.${fileExt}`;
          let buff = new Buffer(req.body.profile_pic.value, 'base64');
           fs.writeFileSync(profile_pic_db, buff,async(err)=>{
             console.log("here coming");
            if(err)
            return res
            .status(500)
            .send(
              `Error in uploading profile picture.`);
              else
              await console.log('done');
          });
          if (profile_pic) {
            delete req.body.profile_pic;
            req.body.profile_pic = profile_pic;
          }
        } catch (err) {
          console.log('Error In Loading Profile Picture', err);
          delete req.body.profile_pic;
        }
      } else {
        return res
          .status(400)
          .send(
            `Uploaded profile pic is not allowed file type. Please upload ${allowedExt.join(
              ', '
            )} only.`
          );
      }
    } else {
      delete req.body.profile_pic;
    }
    if (req.body.employment) {
      var previousExp = 0;
      var emp = req.body.employment;
      for (var i=0 ; i < emp.length; i++) {
        var year_to_month =(emp[i].duration_to_year - emp[i].duration_from_year ) *12;
        var month = emp[i].duration_to_month - emp[i].duration_from_month;
        previousExp = previousExp + year_to_month + month ;
      }
      req.body["total_experience"] = previousExp;
    } else {
      delete req.body.employment;
    }
    console.log('Before update req.body: ', req.body, req.params._id);
    Applicant.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      { $set: req.body },
      { new: true },
      function(err, finalResult) {
        if (err) {
          console.log('Applicant: If', err);
          res
            .status(500)
            .send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          console.log('Applicant: Else', finalResult);
          res.status(200).send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: finalResult,
          });
        }
      }
    );
  },
  edit_profile_auth: async function(req, res) {

    req.params._id = req.user._id;
    req.params.unique_id = req.user.unique_id;
    delete req.body._id;

    // if cv is set then check if cv already exist and replace it with new one.
    if (req.body.cv && req.body.cv.value) {

      // let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
      let randomNumber = req.params.unique_id;
      let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
      let fileExt = req.body.cv.filename
        .split('.')
        .pop()
        .toLowerCase();

      if (allowedExt.includes(fileExt)) {
        try {
          let startingPath = path.join(__dirname, "../..");
          let resumeName = req.body.cv.filename;
          let resumeFileName = `resume_${randomNumber}`;
          let resume_path_db =  `${startingPath}/public/candidate_resume/${resumeFileName}.${fileExt}`;
          let resume_path = `https://peopleinfinia.in/cdn/candidate_resume/${resumeFileName}.${fileExt}`;
          let buff = new Buffer(req.body.cv.value, 'base64');
           fs.writeFileSync(resume_path_db, buff,async(err)=>{
            if(err)
            return res
            .status(500)
            .send(
              `Error in uploading resume.`);
              else
              await console.log('done');
          });
          const Cv_details = {
            resumeName,
            resumeFileName,
            resume_path
          }
          if (Cv_details) {
            delete req.body.cv;
            req.body.cv = Cv_details;
          }
        } catch (err) {
          delete req.body.cv;
        }
      } else {
        return res
          .status(400)
          .send(
            `Uploaded resume is not allowed file type. Please upload ${allowedExt.join(
              ', '
            )} only.`
          );
      }
    } else delete req.body.cv;

    // profile pic upload
    if (req.body.profile_pic && req.body.profile_pic.value) {
      let allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
      let fileExt = req.body.profile_pic.filename
        .split('.')
        .pop()
        .toLowerCase();

      if (allowedExt.includes(fileExt)) {
        try {
          let startingPath = path.join(__dirname, "../..");
          let randomNumber = req.params.unique_id;
          let dpName = `dp_${randomNumber}`;
          let profile_pic_db =  `${startingPath}/public/user_profile_pic/${dpName}.${fileExt}`;
          let profile_pic = `https://peopleinfinia.in/cdn/user_profile_pic/${dpName}.${fileExt}`;
          let buff = new Buffer(req.body.profile_pic.value, 'base64');
           fs.writeFileSync(profile_pic_db, buff,async(err)=>{
            if(err)
            return res
            .status(500)
            .send(
              `Error in uploading profile picture.`);
              else
              await console.log('done');
          });
          if (profile_pic) {
            delete req.body.profile_pic;
            req.body.profile_pic = profile_pic;
          }
        } catch (err) {
          delete req.body.profile_pic;
        }
      } else {
        return res
          .status(400)
          .send(
            `Uploaded profile pic is not allowed file type. Please upload ${allowedExt.join(
              ', '
            )} only.`
          );
      }
    } else {
      delete req.body.profile_pic;
    }
    if (req.body.employment) {
      var previousExp = 0;
      var emp = req.body.employment;
      for (var i=0 ; i < emp.length; i++) {
        var year_to_month =(emp[i].duration_to_year - emp[i].duration_from_year ) *12;
        var month = emp[i].duration_to_month - emp[i].duration_from_month;
        previousExp = previousExp + year_to_month + month ;
      }
      req.body["total_experience"] = previousExp;
    } else {
      delete req.body.employment;
    }
    Applicant.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      { $set: req.body },
      { new: true },
      function(err, finalResult) {
        if (err) {
          res
            .status(500)
            .send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          res.status(200).send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: finalResult,
          });
        }
      }
    );
  },

  change_password: function(req, res) {
    // console.log('req---', req.body.newPassword,req.body.oldPassword);
    Applicant.findOne(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      async function(err, result) {
        let salt = bcrypt.genSaltSync(10);
        let newpassword = bcrypt.hashSync(req.body.newPassword, salt);
        let validPassword = await bcrypt.compare(
          req.body.oldPassword,
          result.password
        );
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else if (!validPassword) {
          res.send({
            responseMessage: 'Please Enter correct old password',
            responseCode: 204,
          });
        } else {
          Applicant.update(
            { _id: mongoose.Types.ObjectId(result._id) },
            { $set: { password: newpassword } },
            function(err, result2) {
              if (err) {
                res.send({ responseMessage: 'server err', responseCode: 500 });
              } else {
                res.send({
                  responseMessage: 'password change sucessfully',
                  responseCode: 200,
                });
              }
            }
          );
        }
      }
    );
  },


  candidateSearch: async(req,res) => {
    await Recruiter.findById(mongoose.Types.ObjectId(req.user._id), (err, docs) => {
      if (err) {
        res.status(500).json({ responseCode: 500, responseMessage: 'Server Error' })
      }
      else {
        if (docs.subscription_active === false) {
         res.status(200).json({
           responseCode: 404,
           success: false,
           responseMessage: 'Please take the Subscription First'
         })
        }
        else { searchFunction()}
      }
    })

    function searchFunction() {
      var skipData = ((req.body.page - 1 ) * 20 );
      var { job_title, keywords, notice_period, ctc_min_lacs, ctc_max_lacs, Location, industry, role, functionalArea, last_active} = req.body;
      var arr = [];
      var regex = [];
      var roleRegex = [];
      var last_active;
      if (min_exp !== null && max_exp !== null && min_exp === '' && max_exp === '') {
        var min_exp = parseInt(req.body.min_experience)*12;
        var max_exp = parseInt(req.body.max_experience)*12;
      }
      if (last_active !== null && last_active !== '' && last_active !== 'All') {
        let dateG = parseInt(last_active);
        var last_login = new Date(Date.now() - (1000 * 86400 * dateG))
      }

      var exp_min_lacs = parseInt(ctc_min_lacs);
      var exp_max_lacs = parseInt(ctc_max_lacs);

        for (var i = 0; i < keywords.length; i++) {
          regex[i] = new RegExp(keywords[i]);
      }

      for (var i = 0; i < role.length; i++) {
        roleRegex[i] = new RegExp(role[i]);
    }

  for (let [key, value] of Object.entries(req.body)) {

    if((key == 'keywords') && (value != '')) {
      arr.push({skills: {$in: regex}})
    }

    if((key == 'Location') && (value != '')){
      arr.push(    { current_location:  {
        $regex: Location,
        '$options': 'i'
        }})
    }
    if((key == 'job_title') && (value != '')){
      arr.push(    { reume_headline:  {
        $regex: job_title,
        '$options': 'i'
        }})
    }
    if((key == 'notice_period') && (value != '')) {
      arr.push( { duration_notice_period: notice_period })
    }
    if((key == 'min_experience') && (value != '')) {
      arr.push( { currentExpMon: { "$gte": min_exp, "$lte": max_exp }})
    }
    if((key == 'role') && (value != '')) {
      arr.push({role: {$in: roleRegex}})
    }
    if((key == 'functionalArea') && (value != '')) {
      arr.push( { 'functional_area._id': value})
    }
    if((key == 'industry') && (value != '')) {
      arr.push({desired_industry: industry})
    }
    if((key == 'ctc_max_lacs') && (value != '')) {
      arr.push( { expected_salary_lacs: { "$gte": exp_min_lacs, "$lte": exp_max_lacs }})
    }
    if ((key == 'last_active') && (value != '') && (value != 'All')) {
      arr.push({last_login_at: {"$gte": new Date(last_login)}})
    }

}
var query  = [
  {
    $addFields: {
        month: {
          $subtract: [ { $month : new Date() }, "$experience_month" ]
         },
        year:
          { $multiply: [ {
            $subtract: [ { $year : new Date() },"$experience_year" ]
          } , 12 ]
         },
    }
  },
 {
    $addFields: {
        currentExpMon: {
           $add: [ "$month", "$year", "$total_experience" ],
          $add: [ "$month", "$year" ]
        }
    }
 },
  { $match: {$or: arr}  },

  {
    $project: {
      name:1,
      type:1,
      skills:1,
      duration_notice_period: 1,
      current_location: 1,
      desired_location: 1,
      current_designation: 1,
      current_company: 1,
      profile_pic: 1,
      employment:1,
      education: 1,
      currentExpMon: 1,
      month:1,
      year: 1,
      expected_salary_currency: 1,
      expected_salary_lacs: 1,
      expected_salary_thousand: 1,
      total_experience:1,
      "weight": {
        "$add": [
          { "$cond": {
            "if": { $and:[{ "$eq" : [ "$last_login_at", last_login ] },
            { "$ne" : [ "$last_login_at", null ] },
            { "$ne" : [ "$last_login_at", "" ] } ] },
            "then": 1,
            "else": 0
          }},
          { "$cond": {
            "if": { $and:[{ "$eq" : [ "$skills", regex ] },
            { "$ne" : [ "$skills", [] ] },
            { "$ne" : [ "$skills", "" ] } ] },
            "then": 1,
            "else": 0
          }},
          { "$cond": {
            "if": { $and:[{ "$eq" : [ "$role", roleRegex ] },
            { "$ne" : [ "$role", null ] },
            { "$ne" : [ "$role", "" ] } ] },
            "then": 1,
            "else": 0
          }},
          { "$cond": {
            "if": { $and:[{ "$eq" : [ "$desired_industry._id", industry ] },
            { "$ne" : [ "$desried_industry", null ] },
            { "$ne" : [ "$desried_industry", "" ] } ] },
            "then": 1,
            "else": 0
          }},
          { "$cond": {
            "if": { $and:[{ "$eq" : [ "functional_area._id", functionalArea ] },
            { "$ne" : [ "$functional_area.id", null ] },
            { "$ne" : [ "$functional_area.id", "" ] } ] },
            "then": 1,
            "else": 0
          }},

          { "$cond": {
            "if": { $and:[{ "$eq" : [ "$duration_notice_period", notice_period ] },
            { "$ne" : [ "$duration_notice_peroid", null ] },
            { "$ne" : [ "$duration_notice_peroid", "" ] } ] },
            "then": 1,
            "else": 0
          }},

          { "$cond": {
            "if": { $and:[{ "$eq" : [ "$current_location", Location ] },
            { "$ne" : [ "$current_location", null ] },
            { "$ne" : [ "$current_location", "" ] } ] },
            "then": 1,
            "else": 0
          }},
          { "$cond": {
            "if": { $and: [
            {"$gte" : ["$expected_salary_lacs", exp_min_lacs]},
            {"$lte" : ["$expected_salary_lacs", exp_max_lacs]},
            { "$ne" : [ "$expected_salary_lacs", null ] },
            { "$ne" : [ "$expected_salary_lacs", "" ] } ] },
            "then": 1,
            "else": 0
          }},
          { "$cond": {
            "if": { $and: [
            {"$gte" : ["$currentExpMon", min_exp]},
            {"$lte" : ["$currentExpMon", max_exp]},
            { "$ne" : ["$currentExpMon", null ] },
            { "$ne" : ["$currentExpMon", "" ] } ] },
            "then": 1,
            "else": 0
          }},
        ]
      },
    },
  },
  { "$sort": { "weight": -1 } },
  {$skip: skipData},
  {$limit: 20}

]

var query2 = [
  { $match: {$or: arr}  },
  { $count: 'counts'}
]


 async.parallel({
  task1: function(cb) {
    Applicant.aggregate(query, function(err, docs) {
      if (err)
      cb (null,err)
      else
     cb(null,docs)
    })
  },
  task2: function(cb) {
    Applicant.aggregate(query2, function(err, docs) {
      if (err)
      cb (null,err)
      else
     cb(null,docs)
    })
}
}, function(err, results) {
  if (err)
  res.status(500).json({responseCode: 500, responseMessage: 'Server Error', success: false})
  res.status(200).json({ result: results, success: true })
})
  }

},

apply_for_job: async(req,res) => {

  job_details = new Candidate(req.body);

  const add_job_Apply = [function taskFirst(cb) {
    let query = { job_id: mongoose.Types.ObjectId(req.body.jobId) };
    let data = {
      client_id : req.params.id,
      $push: {
        candidates:  mongoose.Types.ObjectId(req.params.id)

      }
    }
    Candidate.findOneAndUpdate(query, data, { upsert: true, new: true }).populate('job_id'). exec( (err,result) => {
      if(err) cb(err);
      else{
      cb(null,'Save in Job');
      var type = 'appliedForJob';
      var userObject = {
        email: [req.user.email_id, 'support@peopleinfinia.com'],
        job_title: result.job_id.job_title
      }
      nodemail.nodeMail(userObject, type, async (err, info) => {
        if (err) { console.log('err---------------------->', err)}
       }) }
    })
},

function taskSecond(cb) {
  let query = { _id: mongoose.Types.ObjectId(req.user._id) };
  let data = {
    $push: {
      applied_jobs:  mongoose.Types.ObjectId(req.body.jobId)

    }
  }
Applicant.findOneAndUpdate(query, data, {upsert: true}, (err, result) => {
  if (err) cb(err);
  else {
    cb(null, 'Save in Applicant');
  }
})
}
  ]

  async.series(add_job_Apply, (err, results) => {
    if (err)  {
      res.json({
        responseCode: 500,
        responseMessage: 'Server Error'
      });
    }
    else  res.json({responseCode:200, result: results});
})
},

all_applied_jobs: (req,res) => {
  Applicant.findOne({_id:mongoose.Types.ObjectId(req.user._id)})
           .populate('applied_jobs' , 'job_title location skills summary total_exp salary created_at')
           .exec( (err,results) => {
    if (err) {
    res.json({
      responseCode: 500,
      responseMessage: 'Server Error'
    });
           }
    else res.json({
      responseCode: 200,
      result: results
    });
  })
},

get_user_detail: (req,res) => {
  Applicant.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
    if (err) {
      res.json({
        responseCode: 500,
        responseMessage: 'Server Error'
      });
    }
    else {
      res.json({
        responseCode: 200,
        result: docs
      });
    }

  })
}









};

module.exports = candidate_api;
