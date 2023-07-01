const fs = require('fs');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const waterfall = require('async-waterfall');
const cloudinary = require('cloudinary');
const async = require('async');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const  pmsUser   = require('../mongo_handler/pmsUser');
const  feedback   = require('../mongo_handler/feedback');
const  goal   = require('../mongo_handler/goal');
const spark = require('../global_vars/sparkpost.js');
const uniqueId = require('../global_vars/uniqueId');
const Candidate = require('../mongo_handler/candidate');
// const Recruiter = require('../mongo_handler/user');

const uploadToCloudinary = require('../global_vars/helper');
cloudinary.config({
    cloud_name: 'dtgvxijvw',
    api_key: '651743287142786',
    api_secret: '9v4R33o5KkDGhcsCSEd_Et4ceKw',
  });

  const pmsuser_api = {
    onping: function(req, res) {
      res.status(200).send('OK');
    },
  
    getDetails: async function(req, res) {
      const applicant = await pmsUser.findOne({
        _id: mongoose.Types.ObjectId(req.params._id),
      });
      res.send(applicant);
    },
  


    pms_user_signup: async function(req, res) {

      pmsUser.findOne({ email_id: req.body.email_id }, async function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } 
        else if (!result) {
        //  return res.status(400).send('User already registered.');
        // generate unique id
        
        req.body.unique_id = uniqueId();
        if(req.body.profile_pic != null && req.body.profile_pic != undefined){
        if (req.body.profile_pic.value) {
          let randomNumber = req.body.unique_id;
          let allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
          let fileExt = req.body.profile_pic.filename
            .split('.')
            .pop()
            .toLowerCase();
          if (allowedExt.includes(fileExt)) {
                 let resumeName = req.body.profile_pic.filename;
              let resumeFileName = `pmsPic_${randomNumber}`;
              let startingPath = path.join(__dirname, "../..");
              let resume_path_db = `./public/${resumeFileName}.${fileExt}`;
              let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
              let buff = new Buffer(req.body.profile_pic.value, 'base64');
               fs.writeFileSync(resume_path_db, buff,async(err)=>{
                if(err)
                return res
                .status(500)
                .send(
                  `Error in uploading pic.`);
                  else
                  await console.log('done');
              });
              const Cv_details = {
                resumeName,
                resumeFileName,
                resume_path
              }
              if (Cv_details) {
                delete req.body.profile_pic;
                req.body.profile_pic = Cv_details.resume_path;
              }
       
          } else {
            return res
              .status(400)
              .send(
                `Uploaded profile_pic is not allowed file type. Please upload ${allowedExt.join(
                  ', '
                )} only.`
              );
          }
        } else delete req.body.profile_pic;
      }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash('User@123', salt);
        // req.body.email_verified = true;
        req.body.timeline = [
          {
            action: 'signup',
            status: 'completed',
            date: Date.now(),
          },
        ];
    // console.log("details",req.body);
    
       var user = new pmsUser(req.body);
        user.save(function(err) {
            if (err) {
                console.log('spark email send error: ', err);
                    res
                  .status(500)
                  .send('Something went wrong! Please try again.', err);
        //  let userDel =  Applicant.findOneAndDelete({ 'email_id':result.email_id });
    
              } else {
                var htmlContent = spark.sendOnboardingUserDetails(
                  // req.body.firstName,
                  req.body.email_id,
                  // req.body.sentMail,
                  
        // 'eswar.guttulaa@gmail.com',
                 req.body.email_id,
                  req.body.mobile,
                  'User@123'
                );
                spark
                .send(
                  'noreply@peopleinfinia.com',
                  req.body.email_id,
                  'Account Details',
                  htmlContent,
                  ''
                )
                .then(function(result1) {
                  if (err) {
                    res.send({ responseMessage: 'err', responseCode: 500 });
                  } else {
                    // const token = user_save.generateAuthToken();
                    // res.header('x-auth-token', token).send({
                    //   responseMessage:
                    //     'Please check your email and activate the link.',
                    //   responseCode: 200,
                    // });
                    res.status(200).send({
                      responseCode: 200,
                      responseMessage: 'Registration Done',
                      result: user,
                    });
                  }
                });
                // res.status(200).header('x-auth-token', token).send('Please check your email and activate the link.');
              
              }
       
        });
      }
      else {
        res.send({
          responseMessage: 'This Email Id is already exists',
          responseCode: 400,
        });
      }
    });
      },
get_pms_user_detail: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
          console.log("DDDDDDDDD",req.params)
            const query = pmsUser.findOne({ _id: mongoose.Types.ObjectId(req.params._id) })
             query.exec((err ,results) => {
                if (err) {
                    res
                    .status(500)
                    .send('Something went wrong! Please try again.', err);
                  }
                  else {
                    res.status(200).send({
                        responseCode: 200,
                        responseMessage: 'get Done',
                        result: results,
                      });
                  }
      
        })
      },
      pms_Edit_profile: async function(req, res) {
        // console.log('edit_profile > req.params: ', req.params);
        // console.log(' OnBoard_MeetingWit edit_profile > req.body: ', req.body,);
        let datset;
        let datsetVal;
            // { "$set": { 'teamMeeting': datsetVal } }
     
          let  query = pmsUser.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body._id) }, 
            { $set: req.body }
            , { new: false },
            function(err, finalResult) {
              if (err) {
                console.log('Onboarding: If', err);
                res
                  .status(500)
                  .send({ responseMessage: 'server err', responseCode: 500 });
              }
               else {
                // console.log('Onboarding: Else', finalResult);
                res.status(200).send({
                  responseMessage: 'Successfully updated.',
                  responseCode: 200,
                  result: finalResult,
                });
              }
            
            }
            );
  
      
      },
      pms_user_edit_profile: async function(req, res) {
        // console.log('edit_profile > req.params: ', req.params);
        // console.log('edit_profile > req.body: ', req.body,req.body.MeetingWithHRManager);
        // if cv is set then check if cv already exist and replace it with new one.
        if(req.body.profile_pic !=undefined){
        if (req.body.profile_pic.value) {
            let randomNumber = req.body.unique_id;
            let allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
            let fileExt = req.body.profile_pic.filename
              .split('.')
              .pop()
              .toLowerCase();
            if (allowedExt.includes(fileExt)) {
                   let resumeName = req.body.profile_pic.filename;
                let resumeFileName = `pmsPic_${randomNumber}`;
                let startingPath = path.join(__dirname, "../..");
                let resume_path_db = `./public/${resumeFileName}.${fileExt}`;
                let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
                let buff = new Buffer(req.body.profile_pic.value, 'base64');
                 fs.writeFileSync(resume_path_db, buff,async(err)=>{
                  if(err)
                  return res
                  .status(500)
                  .send(
                    `Error in uploading pic.`);
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
                  req.body.profile_pic = Cv_details.resume_path;
                }
         
            } else {
              return res
                .status(400)
                .send(
                  `Uploaded profile_pic is not allowed file type. Please upload ${allowedExt.join(
                    ', '
                  )} only.`
                );
            }
          } 
          // else delete req.body.profile_pic;
        }
        // console.log('BeforepmsUser update req.body: ', req.body, );
        pmsUser.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.body._id) },
          { $set: req.body },
          { new: true },
          function(err, finalResult) {
            if (err) {
              console.log('pmsUser: If', err);
              res
                .status(500)
                .send({ responseMessage: 'server err', responseCode: 500 });
            } else {
              console.log('pmsUser: Else', finalResult);
              res.status(200).send({
                responseMessage: 'Successfully updated.',
                responseCode: 200,
                result: finalResult,
              });
            }
          }
        );
      },

      pms_Meeting_Edit_profile: async function(req, res) {
        // console.log('edit_profile > req.params: ', req.params);
        // console.log(' OnBoard_MeetingWit edit_profile > req.body: ', req.body,);
        let datset;
        let datsetVal;
        let query
        if(req.body.teamMeeting){
          datset='teamMeeting'
          datsetVal=req.body.teamMeeting
          query = pmsUser.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body._id) }, 
            { "$set": { 'teamMeeting': datsetVal } }, { new: false },
            function(err, finalResult) {
              if (err) {
                console.log('Onboarding: If', err);
                res
                  .status(500)
                  .send({ responseMessage: 'server err', responseCode: 500 });
              }
               else {
                // console.log('Onboarding: Else', finalResult);
                res.status(200).send({
                  responseMessage: 'Successfully updated.',
                  responseCode: 200,
                  result: finalResult,
                });
              }
            
            }
            );
  
        }
      
      },
      goalPost:(req, res)=>{
        var go = new goal(req.body);
        go.save(function(err, result) {
                if(err){
                res.send({ responseMessage: 'err', responseCode: 500 })}
                else{
                res.send({
                  responseMessage: 'goal posted',
                  responseCode: 200,
                });
              }
              })
      },
      del_goal: async function (req, res) {

        console.log('$$$$$req.params._id',req.body,req.params._id);
    
        // const { error } = validateIssue(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
    
        let body = req.body;
        const issue = await goal.findByIdAndDelete(req.params._id, );
    
        if (!issue) return res.status(404).send('The issue with the given ID was not found.');
    
        res.send('Deleted');
      },
   
      update_Goal: async function(req, res) {
        await  goal.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: req.body }, { new: true }, function (err, FinalResult) {
          if (err) {
            res.status(500).json({
              responseCode: 500,
              responseMessage: 'Server Error'
            })
          }
          else {
            res.status(200).json({
              responseCode: 2040,
              responseMessage: 'Updated Successfully',
              result: FinalResult
            })
          }
                                  })
      },
      get_All_corpo_Goals: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = goal.find({recruiter_id: mongoose.Types.ObjectId(req.params._id)}).populate({ path: 'create_userId'})
             query.exec((err ,user) => {
          if (err) {
            res
            .status(500)
            .send('Something went wrong! Please try again.', err);
          }
          else {
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'get goals Done',
                result: user,
              });
          }
      
        })
      },
      get_All_User_Goals: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const querycc = goal.find({$or: [{goalType:'Company'}, { "create_userId": mongoose.Types.ObjectId(req.params._id) },]}).populate({ path: 'recruiter_id'})
            // find({$and:[{$or:[{"first_name" : "john"}, {"last_name" : "john"}]},{"phone": "12345678"}]})
            // Individual  Company
    // .find({   $or : [  {"first_name": "john"},{"last_name": "john"}   ],  "phone": "12345678"     })
        
            //   .find({
          //     "to": { "$in": ["user1"] },
          //     "$or": [
          //         { "voting.upVoted": true }
          //     ]
          // })
          const query = goal.aggregate([
            {
            "$match": {
                $or: [
                    { "goalType": { "$eq": "Company" } },
                  { "create_userId": { "$eq": mongoose.Types.ObjectId(req.params._id) } },

                ],
                // $and: [
                //   { "create_userId": { "$eq": mongoose.Types.ObjectId(req.params._id) } },

                //     // { "status": true },
                //     // { "year": year },
                //     // {
                //     //     startDate: {
                //     //         $lte: new Date(dateT),
                //     //         $gte: new Date(dateF),
                //     //     }
                //     // }

                // ]
            }
        },
      ]).sort({ created_at: -1 });
      
          const queryd = goal.aggregate([
            {
                "$match": {
                    $and: [
                        { "create_userId": { "$eq": mongoose.Types.ObjectId(req.params._id) } },
                        // { "goalType": 'Company' },
                        // {
                        //     'startDate': {
                        //         $lt: new Date(dateT),
                        //         $gt: new Date(dateF),
                        //     }
                        // },
                    ],
                 
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "recruiter_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {
                "$unwind": {
                    "path": "$company"
                }
            },
       
          
        ]).sort({ created_at: -1 });
            query.exec((err ,user) => {
          if (err) {
            console.log(err)
            res
            .status(500)
            .send('Something went wrong! Please try again.', err);
          }
          else {
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'get goals Done',
                result: user,
              });
          }
      
        })
      },
      postFeedback:(req, res)=>{
        var feedbacks = new feedback(req.body);
        feedbacks.save(function(err, result) {
                if(err){
                res.send({ responseMessage: 'err', responseCode: 500 })}
                else{
                res.send({
                  responseMessage: 'feedbacks posted',
                  responseCode: 200,
                });
              }
              })
      },
      // get_submit_issue: async function(req, res) {
      //   const userIssue = await UserIssue.findOne({ _id: req.params._id })
      //     .populate({ path: 'user', select: 'user_name' })
      //     .populate({ path: 'issue', select: 'question' });
      //   res.send(userIssue);
      // },
      get_All_corpo_feedbacks: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = feedback.find({recruiter_id: mongoose.Types.ObjectId(req.params._id)}).populate({ path: 'userId'}).populate({ path: 'userIdSend'})
             query.exec((err ,user) => {
          if (err) {
            res
            .status(500)
            .send('Something went wrong! Please try again.', err);
          }
          else {
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'get feedback Done',
                result: user,
              });
          }
      
        })
      },
      get_All_postedPerson_feedbacks: (req,res) => {
        console.log('req post',req.params._id)

        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = feedback.find({userId: mongoose.Types.ObjectId(req.params._id)}).populate({ path: 'userIdSend', select: 'firstName email_id profile_pic employeeId mobile'})
             query.exec((err ,user) => {
          if (err) {
            console.log('err',err)

            res.send({ responseMessage: 'err', responseCode: 500 })}
            else{
            res.send({
              responseMessage: 'feedbacks get',
              responseCode: 200,
              result: user,
            });
          //   res
          //   .status(500)
          //   .send('Something went wrong! Please try again.', err);
          // }
          // else {
          //   res.status(200).send({
          //       responseCode: 200,
          //       responseMessage: 'get feedback Done',
          //       result: user,
          //     });
          }
      
        })
      },
      get_All_received_feedbacks: (req,res) => {
        console.log('req',req.params._id)
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = feedback.find({userIdSend: mongoose.Types.ObjectId(req.params._id)}).populate({ path: 'userId',select: 'firstName email_id profile_pic employeeId mobile'})
             query.exec((err ,user) => {
              if (err) {
            console.log('err',err)

                res.send({ responseMessage: 'err', responseCode: 500 })}
                else{
                res.send({
                  responseMessage: 'feedbacks get',
                  responseCode: 200,
                  result: user,
                });
              }
      
        })
      },
      get_courcebyId_detail: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = cource.findOne({ _id: mongoose.Types.ObjectId(req.params._id) })
             query.exec((err ,results) => {
                if (err) {
                    res
                    .status(500)
                    .send('Something went wrong! Please try again.', err);
                  }
                  else {
                    res.status(200).send({
                        responseCode: 200,
                        responseMessage: 'get Done',
                        result: results,
                      });
                  }
      
        })
      },
      pms_forget_password: function(req, res) {
        console.log('req---', req.body);
        pmsUser.findOne({ email_id: req.body.email_id }, function(err, result) {
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
              result.firstName,
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
                  pmsUser.findOneAndUpdate(
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
      pms_change_password: function(req, res) {
        console.log('req---', req.body);
        pmsUser.findOne(
          { _id: mongoose.Types.ObjectId(req.params._id) },
          async function(err, result) {
            let salt = bcrypt.genSaltSync(10);
            let newpassword = bcrypt.hashSync(req.body.newPassword, salt);
            let validPassword = await bcrypt.compare(
              req.body.oldPassword,
              result.password
            );
            if (err) {
              res.send({
                responseMessage: 'server err',
                responseCode: 500,
              });
            } else if (!validPassword) {
              res.send({
                responseMessage: 'Please Enter correct old password',
                responseCode: 204,
              });
            } else {
              pmsUser.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(result._id) },
                { $set: { password: newpassword } },
                function(err, result2) {
                  if (err) {
                    res.send({
                      responseMessage: 'server err',
                      responseCode: 500,
                    });
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
      // test
      Pms_get_profile: function(req, res) {
        // console.log('@@@@@@@@@@@enter the data ',req.body,req.params);
        pmsUser.findOne({ _id: mongoose.Types.ObjectId(req.params._id) },function(
          err,
          result
        ) {
          if (err) {
            res.send({ responseMessage: 'server err', responseCode: 500 });
          } else {
            // console.log("data",result);
            res.send({
              responseMessage: 'Profile found',
              responseCode: 200,
              result: result,
            });
          }
        });
      },  

    
      get_All_pms_user_detail: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = pmsUser.find({})
             query.exec((err ,user) => {
          if (err) {
            res
            .status(500)
            .send('Something went wrong! Please try again.', err);
          }
          else {
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'get Done',
                result: user,
              });
          }
      
        })
      },
      get_All_pms_user_detailCorporate: (req,res) => {
        // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = pmsUser.find({recruiter_id: mongoose.Types.ObjectId(req.params._id)})
             query.exec((err ,user) => {
          if (err) {
            res
            .status(500)
            .send('Something went wrong! Please try again.', err);
          }
          else {
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'get Done',
                result: user,
              });
          }
      
        })
      },
      pms_login: async function(req, res) {
        console.log('pms_login',req.body)
        // validate email and password
       // const { error } = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
    
        // find user by provided email id
        let user = await pmsUser.findOne({ email_id: req.body.email_id });
        if (!user) return res.status(400).send('Invalid email or password.');
    
        // if password doesn't match
        // let salt = bcrypt.genSaltSync(10);
        //     let password = bcrypt.hashSync(rString, salt);
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) return res.status(400).send('Invalid password.');
    
        // if user's email is not verified.
        // if (!user.is_emailVerify)
        //   return res
        //     .status(400)
        //     .send('Email not verified. Please verify email first.');
    
        // log user's login time
        await pmsUser.findByIdAndUpdate(
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
    
    };

    module.exports = pmsuser_api;