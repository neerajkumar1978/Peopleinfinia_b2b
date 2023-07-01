const fs = require('fs');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const waterfall = require('async-waterfall');
const cloudinary = require('cloudinary');
const async = require('async');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const  Onboarding   = require('../mongo_handler/onboardingUsers.js');
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

  const onboardinguser_api = {
    onping: function(req, res) {
      res.status(200).send('OK');
    },
  
    getDetails: async function(req, res) {
      const applicant = await Onboarding.findOne({
        _id: mongoose.Types.ObjectId(req.params._id),
      });
      res.send(applicant);
    },
  


    OnBoard_user_signup: async function(req, res) {

      Onboarding.findOne({ email_id: req.body.email_id }, async function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } 
        else if (!result) {
        //  return res.status(400).send('User already registered.');
        // generate unique id
        console.log('################################spark email send error: ', );
        
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
              let resumeFileName = `onPic_${randomNumber}`;
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
    
       var user = new Onboarding(req.body);
        user.save(function(err) {
            if (err) {
                console.log('spark email send error: ', err);
                    res
                  .status(500)
                  .send('Something went wrong! Please try again.', err);
        //  let userDel =  Applicant.findOneAndDelete({ 'email_id':result.email_id });
    
              } else {
                // res.status(200).header('x-auth-token', token).send('Please check your email and activate the link.');
                res.status(200).send({
                  responseCode: 200,
                  responseMessage: 'Registration Done',
                  result: user,
                });
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
      get_onb_user_detail: (req,res) => {
        // Onboarding.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
          console.log("DDDDDDDDD",req.params)
            const query = Onboarding.findOne({ _id: mongoose.Types.ObjectId(req.params._id) })
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
      

      OnBoard_user_edit_profile: async function(req, res) {
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
                let resumeFileName = `onPic_${randomNumber}`;
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
          } else delete req.body.profile_pic;
        }
        // console.log('BeforeOnboarding update req.body: ', req.body, );
        Onboarding.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.body._id) },
          { $set: req.body },
          { new: true },
          function(err, finalResult) {
            if (err) {
              console.log('Onboarding: If', err);
              res
                .status(500)
                .send({ responseMessage: 'server err', responseCode: 500 });
            } else {
              console.log('Onboarding: Else', finalResult);
              res.status(200).send({
                responseMessage: 'Successfully updated.',
                responseCode: 200,
                result: finalResult,
              });
            }
          }
        );
      },

      get_All_onb_user_detail: (req,res) => {
        // Onboarding.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = Onboarding.find({})
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
      get_All_onb_user_detailCorporate: (req,res) => {
        // Onboarding.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
            const query = Onboarding.find({recruiter_id: mongoose.Types.ObjectId(req.params._id)})
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

      OnBoard_MeetingWithHRedits_profile: async function(req, res) {
        // console.log('edit_profile > req.params: ', req.params);
        // console.log(' OnBoard_MeetingWit edit_profile > req.body: ', req.body,);
        
        let datset;
        let datsetVal;
        let query
        if(req.body.MeetingWithHRManager){
          datset='MeetingWithHRManager'
          datsetVal=req.body.MeetingWithHRManager
          query = Onboarding.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body._id) }, { "$set": { 'MeetingWithHRManager': datsetVal } }, { new: false });
  
        }
        if(req.body.teamMeeting){
          datset='teamMeeting'
          datsetVal=req.body.teamMeeting
          query = Onboarding.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body._id) }, { "$set": { 'teamMeeting': datsetVal } }, { new: false });
  
        }
        if(req.body.sendCredential){
          datset='sendCredential'
          datsetVal=req.body.sendCredential
          query = Onboarding.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body._id) }, { "$set": { 'sendCredential': true,'sendCredentialDate': req.body.sendCredentialDate } }, { new: false });
  
        }
        // console.log("datset",datset,datsetVal)

   
        Onboarding.findOneAndUpdate(
                  // { "_id": mongoose.Types.ObjectId(req.body._id) },
                  //  { "$set": { 'teamMeeting': datsetVal } },
                  //   { new: false },

          { _id: mongoose.Types.ObjectId(req.body._id) },
          // { $set:{ "MeetingWithHRManager": req.body.MeetingWithHRManager} },
          { $set: req.body },

          { new: true },
          // await query.exec(async (err, finalResult) => {
          //   if (err) {
          //     console.log('Onboarding: If', err);
          //     res
          //       .status(500)
          //       .send({ responseMessage: 'server err', responseCode: 500 });
          //   }
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
        )
      },

     OnBoard_userFiles_edit_profile: async function(req, res) {
        // console.log('edit_profile > req.params: ', req.params);
        // console.log('edit_profile > req.body: ', req.body,req.body.MeetingWithHRManager);
        // if cv is set then check if cv already exist and replace it with new one.
        if(req.body.sendType !=undefined){
        if (req.body.sendType.value) {
            let randomNumber = req.body.unique_id;
            // let allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
      let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];

             let fileExt = req.body.sendType.filename
              .split('.')
              .pop()
              .toLowerCase();
            if (allowedExt.includes(fileExt)) {
                   let resumeName = req.body.sendType.filename;
                // let resumeFileName = `onPic_${randomNumber}`;
                let resumeFileName = req.body.sendType.type+"_"+req.body.unique_id;
                let startingPath = path.join(__dirname, "../..");
                let resume_path_db = `./public/OnBoard_userFiles/${resumeFileName}.${fileExt}`;
                let resume_path = `https://api-b2b.peopleinfinia.in/cdn/OnBoard_userFiles/${resumeFileName}.${fileExt}`;

                // let resume_path_db =  `${startingPath}/public/OnBoard_userFiles/${resumeFileName}.${fileExt}`;
                // let resume_path = `https://peopleinfinia.in/cdn/OnBoard_userFiles/${resumeFileName}.${fileExt}`;
               
                let buff = new Buffer(req.body.sendType.value, 'base64');
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
                console.log('%%%%%%%%%',resumeName,                resumeFileName,     resume_path)
                if (Cv_details) {
                console.log('QQQQQQQQQ%%%%%%%%%',resumeName,                resumeFileName,   resume_path)

                  // delete req.body.sendType;
                  if(req.body.sendType.type=='SignW_4Form'){
                  req.body.SignW_4Form = Cv_details.resume_path;
                  req.body.date_SignW_4Form=req.body.sendTypeDate
                  }
                  if(req.body.sendType.type=='SignI_9Form'){
                  req.body.SignI_9Form = Cv_details.resume_path;
                  req.body.date_SignI_9Form=req.body.sendTypeDate
                  }
                  if(req.body.sendType.type=='SignNon_dis_Agre'){
                  req.body.SignNon_dis_Agre = Cv_details.resume_path;
                  req.body.date_SignNon_dis_Agre = req.body.sendTypeDate;
                  }
                  if(req.body.sendType.type=='introduction'){
                    req.body.introduction = Cv_details.resume_path;
                    req.body.introductiondate = req.body.sendTypeDate;
                    }
                  
                   delete req.body.sendType;

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
          } else delete req.body.sendType;
        }
        // console.log('BeforeOnboarding update req.body: ', req.body, );
        Onboarding.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.body._id) },
          { $set: req.body },
          { new: true },
          function(err, finalResult) {
            if (err) {
              console.log('Onboarding: If', err);
              res
                .status(500)
                .send({ responseMessage: 'server err', responseCode: 500 });
            } else {
              console.log('Onboarding: Else', finalResult);
              res.status(200).send({
                responseMessage: 'Successfully updated.',
                responseCode: 200,
                result: finalResult,
              });
            }
          }
        );
      },
      sendOnboardingUserDetails: async function(req, res) {
        // console.log("req sendOnboardingUserDetails mail",req.body)
        var htmlContent = spark.sendOnboardingUserDetails(
          // req.body.firstName,
          req.body.email_id,
          // req.body.sentMail,
          
// 'eswar.guttulaa@gmail.com',
         req.body.sentMail,
          req.body.mobile,
          'User@123'
        );
        spark
          .send(
            'noreply@peopleinfinia.com',
            req.body.email_id,
            // 'eswar.guttulaa@gmail.com',
            // 'Login Credential',
            'Sent Mail ',
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

              return res.send({
                responseCode: 200,
                responseMessage: 'Successfully sent mail.',
              });
            }

          })
    
    },































};

module.exports = onboardinguser_api;


















