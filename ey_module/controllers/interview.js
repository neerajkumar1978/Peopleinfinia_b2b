var User = require('../mongo_handler/user.js');
var Userpost = require('../mongo_handler/post.js');
var interview = require('../mongo_handler/interview.js');
var path = require('path');
var emailer = require('../global_vars/mailerfunction.js');
var spark = require('../global_vars/sparkpost.js');
var postcount = require('../mongo_handler/postcount.js');
var Usercandidate = require('../mongo_handler/candidate.js');
var mongoose = require('mongoose');
var waterfall = require('async-waterfall');
var cloudinary = require('cloudinary');
var fs = require('fs');
var async = require('async');
// import moment from 'moment';
var moment = require('moment');  
var interview_post = {
  ping: function(req, res) {
    res.status(200).send('OK');
  },

  // this method is not getting used.
  reschedule_interview_candidate: function(req, res) {
    waterfall(
      [
        function(cb) {
          interview.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body._id) },
            {
              $set: {
                status: '1',
                interview_date: req.body.interview_date,
                interview_time: req.body.interview_time,
                link: req.body.link,
              },
            },
            function(err, result) {
              if (err) {
                cb(null, err);
              } else {
                cb(null, result);
              }
            }
          );
        },
        function(result, cb) {},
      ],
      function(err, sucess) {
        if (err) {
        } else {
        }
      }
    );
  },

  put_reschedule_request: function(req, res) {
    waterfall(
      [
        function(cb) {
          // console.log(`reschedule_request > cb > 1: ${cb}`);
          interview.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params._id) },
            {
              $set: {
                reschedule: 1,
                reschedule_reason: req.body.reschedule_reason,
                reschedule_recruiter_dates: req.body.reschedule_recruiter_dates,
                // link: req.body.link,
              },
            },
            { new: true },
            function(err, result) {
              if (err) {
                console.log(
                  `reschedule_request > findOneAndUpdate > IF: ${err}`
                );
                cb(null, err);
              } else {
                console.log(
                  `reschedule_request > findOneAndUpdate > Else: ${result}`
                );
                cb(null, result);
              }
            }
          );
        },
        function(result, cb) {
          // console.log(`reschedule_request > cb > 2: ${cb} : ${result}`);
          cb(null, result);
        },
      ],
      function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          User.findOne({ _id: result.recruiter_id }).exec(async function(
            err,
            resultR
          ) {
            // console.log("Recruter Details:",result);
            var recruiter = resultR;
            await User.findOne({ _id: result.client_id }).exec(async function(
              err,
              results
            ) {
              let client = results;
              await Userpost.findOne({ _id: result.job_id }).exec(
                async function(err, resultS) {
                  let job = resultS;
                  var htmlContent = spark.slotRequestByClient(
                    client.user_id,
                    client.user_name,
                    recruiter.user_name,
                    recruiter.user_id,
                    job.job_title,
                    req.body.candidate_name,
                    req.body.reschedule_recruiter_dates,
                 
                  );
                  console.log('R', recruiter, 'C', client, 'J', job);
                  await spark
                    .send(
                      'noreply@peopleinfinia.com',
                      recruiter.email_id,
                      'Interview slot confirmed by company',
                      htmlContent,
                      'rohini@peopleinfinia.com'
                    )
                    .then(function(result1) {
                      console.log(
                        'save_time_slot_job: Mail successfully sent.'
                      );
                    })
                    .catch(err => {
                      console.log(
                        'save_time_slot_job: Unable to send mail',
                        err
                      );
                    });
                }
              );
            });
          });
          res.send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: result,
          });
        }
      }
    );
  },

  process_reschedule_request: function(req, res) {
    // console.log(`process_reschedule_request > body: ${req.body}`);
    // console.log(`process_reschedule_request > param: ${req.params._id}`);
    waterfall(
      [
        function(cb) {
          // console.log(`process_reschedule_request > cb > 1: ${cb}`);
          interview.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params._id) },
            {
              $set: {
                reschedule: 2,
                interview_date: req.body.interview_date,
                interview_time: req.body.interview_time,
                link: req.body.link,
                interview_type: req.body.interview_type,
                
              },
            },
            { new: true },
            function(err, result) {
              if (err) {
                console.log(
                  `process_reschedule_request > findOneAndUpdate > IF: ${err}`
                );
                cb(null, err);
              } else {
                console.log(
                  `process_reschedule_request > findOneAndUpdate > Else: ${result}`
                );
                cb(null, result);
              }
            }
          );
        },
        function(result, cb) {
          // console.log(`process_reschedule_request > cb > 2: ${cb} : ${result}`);
          cb(null, result);
        },
      ],
      function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          console.log('data:', result);
          User.findOne({ _id: result.recruiter_id }).exec(async function(
            err,
            result
          ) {
            console.log('Recruter Details:', result);
            var recruiter = result;
            await User.findOne({ _id: req.body.client_id }).exec(async function(
              err,
              results
            ) {
              let client = results;
              await Userpost.findOne({ _id: req.body.job_id }).exec(
                async function(err, resultS) {
                  let job = resultS;
                  var htmlContent = spark.slotREConfirmedByCompany(
                    client.user_id,
                    client.user_name,
                    recruiter.user_name,
                    recruiter.user_id,
                    job.job_title,
                    req.body.candidate_name,
                    req.body.interview_date,
                    req.body.location,
                    req.body.interview_time,
                    req.body.link,
                    req.body.interview_type,

                  );

                  await spark
                    .send(
                      'noreply@peopleinfinia.com',
                      recruiter.email_id,
                      'Interview slot confirmed by company',
                      htmlContent,
                      'rohini@peopleinfinia.com'
                    )
                    .then(function(result1) {
                      console.log(
                        'save_time_slot_job: Mail successfully sent.'
                      );
                    })
                    .catch(err => {
                      console.log(
                        'save_time_slot_job: Unable to send mail',
                        err
                      );
                    });
                }
              );
            });
          });
          res.send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: result,
          });
        }
      }
    );
  },

  reschedule_interviews: function(req, res) {
    interview
      .find({
        client_id: mongoose.Types.ObjectId(req.params.company_id),
        reschedule: 1,
      })
      .sort({ created_at: -1 })
      .populate({ path: 'job_id', select: 'job_title' })
      .populate({ path: 'recruiter_id', select: 'user_name' })
      .exec(function(err, result) {
        if (err) {
          res.send({ responseMessage: 'Server err', responseCode: 500 });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No interview(s) rescheduled.',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'OK',
            responseCode: 200,
            result: result,
          });
        }
      });
  },

  get_reschedule_request: function(req, res) {
    interview
      .findOne({ _id: mongoose.Types.ObjectId(req.params._id), reschedule: 1 })
      .populate({ path: 'job_id', select: 'job_title' })
      .populate({ path: 'recruiter_id', select: 'user_name' })
      .exec(function(err, result) {
        if (err) {
          res.send({ responseMessage: 'Server err', responseCode: 500 });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No interview(s) rescheduled.',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'OK',
            responseCode: 200,
            result: result,
          });
        }
      });
  },

  confirm_slot: function(req, res) {
    interview
      .findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params._id) },
        {
          $set: {
            status: 1,
          },
        },
        { new: true }
      )
      .populate({ path: 'job_id', select: 'job_title' })
      .populate({ path: 'recruiter_id', select: 'user_id' })
      .populate({ path: 'recruiter_id', select: 'user_name' })
      .exec(function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          var htmlContent = spark.slotConfirmedByRecruiter(
            result.candidate_name,
            result.recruiter_id,
            result.job_id.job_title,
            result.interview_date,
            result.link
          );
          spark
            .send(
              'noreply@peopleinfinia.com',
              'rohini@peopleinfinia.com',
              'Interview slot confirmed by recruiter',
              htmlContent,
              ''
            )
            .then(function(result1) {
              console.log('confirm_slot: Mail successfully sent.');
            })
            .catch(err => {
              console.log('confirm_slot: Unable to send mail', err);
            });
          res.send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: result,
          });
        }
      });
  },

  save_time_slot_job: function(req, res) {
    interview.find(
      {
        job_id: mongoose.Types.ObjectId(req.body.job_id),
        client_id: mongoose.Types.ObjectId(req.body.client_id),
        interview_date: req.body.interview_date,
        interview_time: req.body.interview_time,
      },
      function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else if (result.length > 0) {
          res.send({
            responseMessage: 'Date and time is already exists for This job',
            responseCode: 204,
          });
        } else {
          var query = [
            {
              $match: {
                $and: [
                  { job_id: mongoose.Types.ObjectId(req.body.job_id) },
                  { client_id: mongoose.Types.ObjectId(req.body.client_id) },
                ],
              },
            },
            {
              $unwind: '$candidates',
            },
            {
              $match: {
                'candidates._id': mongoose.Types.ObjectId(
                  req.body.candidate_id
                ),
              },
            },
          ];
          Usercandidate.aggregate(query).exec(function(err, recruiterResult) {
            console.log('recruiterResult: ', recruiterResult);
            var a = recruiterResult[0].recruiter_id;
            req.body.recruiter_id = a;
            // var d = new Date(req.body.interview_date).toISOString()
            //   req.body.interview_date = d

            var save_interview = new interview(req.body);
            save_interview.save(function(err, result2) {
              if (err) {
                res.send({
                  responseMessage: 'server err',
                  responseCode: 500,
                });
              } else {
                User.findOne({ _id: recruiterResult[0].recruiter_id }).exec(
                  async function(err, result) {
                    console.log('Recruter Details:', result);
                    var recruiter = result;
                    await User.findOne({ _id: req.body.client_id }).exec(
                      async function(err, results) {
                        let client = results;
                        await Userpost.findOne({ _id: req.body.job_id }).exec(
                          async function(err, resultS) {
                            let job = resultS;
                            var htmlContent = spark.slotConfirmedByCompany(
                              client.user_id,
                              client.user_name,
                              recruiter.user_name,
                              recruiter.user_id,
                              job.job_title,
                              req.body.candidate_name,
                              moment(new Date(req.body.interview_date)).format("YYYY-MMM-DD LT"),
                              // req.body.interview_time,
                              req.body.location, 
                              req.body.link,
                              
                            );

                            await spark
                              .send(
                                'noreply@peopleinfinia.com',
                                recruiter.email_id,
                                'Interview slot confirmed by company',
                                htmlContent,
                                'rohini@peopleinfinia.com'
                              )
                              .then(function(result1) {
                                console.log(
                                  'save_time_slot_job: Mail successfully sent.'
                                );
                              })
                              .catch(err => {
                                console.log(
                                  'save_time_slot_job: Unable to send mail',
                                  err
                                );
                              });
                          }
                        );
                      }
                    );
                  }
                );

                res.send({
                  responseMessage: 'interview scheduled sucessfully',
                  responseCode: 200,
                  result: result2,
                });
              }
            });
          });
        }
      }
    );
  },

  client_job_list: function(req, res) {
    Userpost.find(
      { user_id: mongoose.Types.ObjectId(req.params._id) },
      function(err, result) {
        if (err) {
          res.send({
            responseMessage: 'server err',
            responseCode: 500,
          });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No result found',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'All post found',
            responseCode: 200,
            result: result,
          });
        }
      }
    );
  },

  recruiter_interview_dashboard: function(req, res) {
    // pass login user id
    interview
      .find({ recruiter_id: mongoose.Types.ObjectId(req.params._id) })
      .populate({ path: 'job_id', select: 'job_title' })
      .exec(function(err, result) {
        if (err) {
          res.send({
            responseMessage: 'Server err',
            responseCode: 500,
          });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No Interview scheduled',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'Interview found',
            responseCode: 200,
            result: result,
          });
        }
      });
  },

  client_interview_dashboard: function(req, res) {
    // pass login user id

    interview
      .find({
        recruiter_id: { $exists: true },
        client_id: mongoose.Types.ObjectId(req.params._id),
      })
      .sort({ created_at: -1 })
      .populate({ path: 'job_id', select: 'job_title' })
      .exec(function(err, result) {
        // var query = [

        //    {
        //     $match:{$and:[{job_id:mongoose.Types.ObjectId(result.job_id)},{client_id:mongoose.Types.ObjectId(result.client_id)}]}
        //    },{
        //     $unwind :"$candidates"
        //    },
        //    {
        //     $match :{
        //       $match:{'candidates._id':mongoose.Types.ObjectId(result.candidate_id)}
        //     }
        //    },
        //    {
        //    $lookup:{
        //               from:"posts",
        //               as:"job_id",
        //               localField:"job_id",
        //               foreignField:"_id"
        //             }
        //    }

        // ]

        if (err) {
          res.send({
            responseMessage: 'Server err',
            responseCode: 500,
          });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No Interview scheduled',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'Interview found',
            responseCode: 200,
            result: result,
          });
        }
      });
  },

  client_slot_aviable_list: function(req, res) {
    interview
      .find({ client_id: mongoose.Types.ObjectId(req.params._id) })
      .populate({ path: 'job_id', select: 'job_title' })
      .exec(function(err, result) {
        if (err) {
          res.send({
            responseMessage: 'Server err',
            responseCode: 500,
          });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No slot avaiable',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'find',
            responseCode: 200,
            result: result,
          });
        }
      });
  },

  recruiter_calender_list: function(req, res) {
    interview
      .find({
        $and: [
          { recruiter_id: mongoose.Types.ObjectId(req.params._id) },
          { job_id: mongoose.Types.ObjectId(req.params.job_id) },
        ],
      })
      .populate({ path: 'job_id client_id', select: 'job_title user_name' })
      .exec(function(err, result) {
        if (err) {
          res.send({
            responseMessage: 'Server err',
            responseCode: 500,
          });
        } else if (result.length == 0) {
          res.send({
            responseMessage: 'No result found',
            responseCode: 204,
          });
        } else {
          res.send({
            responseMessage: 'All scheduled interview found',
            responseCode: 200,
            result: result,
          });
        }
      });
  },
};

module.exports = interview_post;
