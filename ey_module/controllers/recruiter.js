const Recruiter = require('../mongo_handler/recruiter');
var PostJob = require('../mongo_handler/post');
var path = require('path');
var spark = require('../global_vars/sparkpost.js');
var mongoose = require('mongoose');
var uniqueId = require('./../global_vars/uniqueId');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

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

var recruiter_api = {

for_try: (req,res)=>{
  res.send({responseCode: 200})
},

// sign_up: (req,res)=>{
//      console.log("req",req.body);
//      var validate_value = {email_id: req.body.email_id , password : req.body.password }
//      const { error } = validate(validate_value);
//      if (error) return res.status(400).send(error.details[0].message);
//      Recruiter.findOne({ email_id: req.body.email_id }, async function(err, result) {
//       if (err) {
//         res.send({ responseMessage: 'server err', responseCode: 500 });
//       } else if (!result) {
//           req.body.user_id = 'REC' + uniqueId();

//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);

//         req.body.timeline = [
//           {
//             action: 'signup',
//             status: 'completed',
//             date: Date.now(),
//           },
//         ];

//         var recruiter_save = new Recruiter(req.body);
//         recruiter_save.save(function(err, result) {
//           var htmlContent = spark.getVerificationMailHtml(
//             result.user_name,
//             result._id,
//             path
//           );
//           spark
//             .send(
//               'noreply@peopleinfinia.com',
//               req.body.email_id,
//               'Account verificaion',
//               htmlContent,
//               ''
//             )
//             .then(function(result1) {
//               if (err) {
//                 res.send({ responseMessage: 'err', responseCode: 500 });
//               } else {
//                 const token = recruiter_save.generateAuthToken();
//                 res.header('x-auth-token', token).send({
//                   responseMessage:
//                     'Please check your email and activate the link.',
//                   responseCode: 200,
//                 });
//               }
//             });
//         });
//       } else {
//         res.send({
//           responseMessage: 'This Email Id is already exists',
//           responseCode: 400,
//         });
//       }
//     });
// },

// login: async(req,res)=>{
//       // validate email and password
//       var validate_value = {email_id: req.body.email_id , password : req.body.password }
//       const { error } = validate(validate_value);
//       if (error) return res.status(400).send(error.details[0].message);

//       // find user by provided email id
//       let recruiter = await Recruiter.findOne({ email_id: req.body.email_id });
//       if (!recruiter) return res.status(400).send('Invalid email or password.');
  
//       // if password doesn't match
//       // let salt = bcrypt.genSaltSync(10);
//       //     let password = bcrypt.hashSync(rString, salt);
//       const validPassword = await bcrypt.compare(
//         req.body.password,
//         recruiter.password
//       );
//       if (!validPassword) return res.status(400).send('Invalid password.');
  
//       // if user's email is not verified.
//       // if (!recruiter.is_emailVerify)
//       //   return res
//       //     .status(400)
//       //     .send('Email not verified. Please verify email first.');
  
//       // log user's login time
//       await Recruiter.updateOne(
//         { _id: mongoose.Types.ObjectId(recruiter._id) },
//         { $set: { is_first_login: true, last_login_at: Date.now() } }
//       );
//       const token = recruiter.generateAuthToken();
//       res.status(200).send({
//         responseCode: 200,
//         responseMessage: 'Login successful',
//         result: recruiter,
//         token,
//       });
// },

// post_job : async(req,res)=>{
//         req.body["userid"]=req.user.user_id;
//         var post_save = new PostJob(req.body);
//         post_save.save(function (err, result) {
//             if (err) {
//               res.send({
//                 responseMessage: "server err",
//                 responseCode: 500
//               })
//             }
//             else {
//                 var htmlContent = spark.clientPostHtml(req.body.company_name, req.body.email_id, result.job_title, result.vacancy)
//                 let mailsend = ["rohini@peopleinfinia.com", "support@peopleinfinia.com"]
//                 // for (let i = 0; i < mailsend.length; i++) {
//                 //     spark.send('noreply@peopleinfinia.com', mailsend[i], 'Client New Post', htmlContent,"").then(function (result1) {
//                 //         if (err) {
//                 //             cb(null, "some thing wrong with mail")
//                 //         }
//                 //     })
//                 // }
//                     res.send({
//                     responseMessage: "save sucessfully",
//                     responseCode: 200
//         })                 
//             }
//         })
// },

all_job_posted: (req,res)=>{
  Recruiter.findOne({ user_id: req.user.user_id }).populate( 'bookmarks' ).sort({ 'created_at': -1 }).exec(function (err, result) {
    if (err) {
        res.send({ responseMessage: "server err", responseCode: 500 });
    }
    else if (result.bookmarks.length == 0){
      res.send({responseMessage: "No Job Found", responseCode: 204})
    }
    else {
        res.send({ responseMessage: "All Jobs", responseCode: 200, result: result.bookmarks });
    }
});
},

recruiter_dashboard: (req,res)=>{
  // Change According to the dashboard
  PostJob.find({  "post_user_id": mongoose.Types.ObjectId(req.user._id),"status": "active" , "draft_status": false }).sort({ 'created_at': -1 }).limit(2).exec(function (err, result) {
    if (err) {

        res.send({ responseMessage: "server err", responseCode: 500 });
    }
    else {
        console.log(result)
        res.send({ responseMessage: "Dashboard Details", responseCode: 200, result: result });
    }
})

  },

delete_job_post: (req,res)=>{
  PostJob.findByIdAndRemove({_id:mongoose.Types.ObjectId(req.body.id)},(err,docs)=>{
        if(err)    
          res.send({responseMessage: "server err",responseCode: 500}) 
        else
          res.send({ responseMessage: "job post deleted", responseCode: 200, result: docs });
      })
      
} ,

candiadate_applied_for_jobpost: (req,res)=>{
  var query = {_id:mongoose.Types.ObjectId(req.body.id)};
  var data = { $push: { comments: { comment: details.userComments, userName: details.userName } } }
  var data = { $push: {applied_apllicants :mongoose.Types.ObjectId(req.user._id)}}
  PostJob.findByIdAndUpdate(query,data,(err,docs)=>{
    if(err)    
      res.send({responseMessage: "server err",responseCode: 500}) 
    else
      res.send({ responseMessage: "Successfully Applied", responseCode: 200 });
  })
}

}

module.exports = recruiter_api;