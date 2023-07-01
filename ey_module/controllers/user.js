// var User = require('../mongo_handler/user.js');
var User = require('../mongo_handler/user');
var Userpost = require('../mongo_handler/post.js')
var path = require('path');
var spark = require('../global_vars/sparkpost.js');
var mongoose = require('mongoose');
var xmlCsvParser = require('../global_vars/xmlcsvParser.js');
var uniqueId = require('./../global_vars/uniqueId');
var waterfall = require('async-waterfall');
var cloudinary = require('cloudinary');
var async = require('async');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const Razorpay = require('razorpay');
var Orders = require('../mongo_handler/paymentdetails');
var cource = require('../mongo_handler/cource');

const { UserIssue, validateUserIssue } = require('../mongo_handler/userIssues'); 
const key_id = 'rzp_test_emJqoQCKRvEJk9'
const key_ids = 'rzp_live_KWtLrQEma0FMCz'
const key_secret = 'sYtcwFWxHKj2xIlW738GWLO6'
const  key_secretN= 'sYtcwFWxHKj2xIlW738GWLO5'   //https://api-b2b.peopleinfinia.in/user/verfication_payment

const mySecret = '12qwaszx'
 
cloudinary.config({
  cloud_name: 'dpijyjulg',
  api_key: '344142488787362',
  api_secret: 'E6textvz7MZkvU4H-zw4L2Ybxmw',
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

var user_api = {
  ping: function(req, res) {
    res.status(200).send('OK');
  },

  get_timeline: async function(req, res) {
    let user = await User.findOne(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      { user_id: 1, user_name: 1, email_id: 1, mobile: 1, timeline: 1 }
    );
    return res.status(200).send(user);
  },

  post_timeline: async function(req, res) {
    let user = await User.findOne({
      _id: mongoose.Types.ObjectId(req.params._id),
      'timeline.action': req.body.action,
    });
    if (user) {
      let updatedUser = await User.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params._id),
          'timeline.action': req.body.action,
        },
        {
          $set: {
            'timeline.$.status': req.body.status,
            'timeline.$.date': Date.now(),
          },
        },
        { new: true }
      );
      return res.status(200).send(updatedUser);
    } else {
      let timeline = {
        action: req.body.action,
        status: req.body.status,
        date: Date.now(),
      };

      let user = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params._id) },
        { $push: { timeline } },
        { new: true }
      );
      return res.status(201).send(user);
    }
  },

  userBulkUpload: function(req, res) {
    async.waterfall(
      [
        function(cb) {
          // xmlCsvParser.parse("temp/userList.xlsx")
          xmlCsvParser
            .parse('uploads/user_bulk_uploads/userList_[17-02-2019].xlsx')
            //  xmlCsvParser.parse(req.body.filePath)
            .then(
              function(objS) {
                cb(null, objS['Sheet1']);
              },
              function(objE) {
                cb(objE, null);
              }
            );
        },
        function(xclData, cb) {
          async.map(
            xclData,
            function(x, cbMap) {
              let salt = bcrypt.genSaltSync(10);
              let password = bcrypt.hashSync('people@123', salt);

              let obj = {
                user_id: 'REC' + uniqueId(),
                user_type: '1',
                company_name: x['CompanyName'],
                type: x['ConsultantType'],
                user_name: x['Name'],
                email_id: x['Email'].toLowerCase(),
                phone_number: x['PhoneNumber'],
                city: x['City'],
                password: password,
                profile_pic: 'https://i.stack.imgur.com/l60Hf.png',
                // is_emailVerify: true,
                is_emailVerify: false,
                status: 'active',
                timeline: [
                  {
                    action: 'signup',
                    status: 'completed',
                    date: Date.now(),
                  },
                  {
                    action: 'email-verification',
                    status: 'completed',
                    date: Date.now(),
                  },
                ],
              };
              var user_data = new User(obj);
              user_data.save(function(err, result) {
                console.log({ result });
                if (err) {
                  console.log('Some error occured while saving bulk users.');
                } else {
                  console.log('2');
                  cb(null, 'done');
                }
              });
            },
            function(err, result) {
              err ? cb(err) : cb(null, result);
            }
          );
        },
      ],
      function(err, result) {
        err ? res.status(500).send(err) : res.send(result);
      }
    );
  },

  first_signup: function(req, res) {
    /* let userStatus = new UserStatus({
      user_id: '5c3c5d546c2a6a500bdeac8a',
      status: 'signup',
      action: 'completed',
      action_time: Date.now()
    });
    userStatus.save(function (err, data) {
      if (err) console.log(err);
      console.log(data);
    }); */
// console.log("user ",req.body);
    User.findOne({ email_id: req.body.email_id }, async function(err, result) {
      if (err) {
        res.send({ responseMessage: 'server err', responseCode: 500 });
      } else if (!result) {
        if (req.body.user_type == '0') req.body.user_id = 'COM' + uniqueId();
         if (req.body.user_type == '1') req.body.user_id = 'REC' + uniqueId();
         else if (req.body.user_type == '2') req.body.user_id = 'INS' + uniqueId();
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        req.body.timeline = [
          {
            action: 'signup',
            status: 'completed',
            date: Date.now(),
          },
        ];

        var user_save = new User(req.body);
        user_save.save(function(err, result) {
          if(err)
          res.send({ responseMessage: 'err', responseCode: 500 });
          else
          res.send({
            responseMessage: 'User Registered',
            responseCode: 200,
          });
          // getVerificationMailHtmlFree
          if(req.body.user_type == '0'){
            var htmlContent = spark.getVerificationMailHtml(
              result.user_name,
              result._id,
              path
            );

            var adhtmlContent = spark.sendAdminNotification(
              'CORPORATE',
              result.user_name,
              result.email_id,
              path
            );
          }else{
             htmlContent = spark.getVerificationMailHtmlFree(
              result.user_name,
              result._id,
              path
            );
             adhtmlContent = spark.sendAdminNotification(
              'FREELANCE CONSULTANT',
              result.user_name,
              result.email_id,
              path
            );
          }
         
          spark
            .send(
              'noreply@peopleinfinia.com',
              req.body.email_id,
              'Account verificaion',
              htmlContent,
              ''
            )
            .then(function(result1) {
              if (err) {
                res.send({ responseMessage: 'err', responseCode: 500 });
              } else {
                const token = user_save.generateAuthToken();
                res.header('x-auth-token', token).send({
                  responseMessage:
                    'Please check your email and activate the link.',
                  responseCode: 200,
                });
              }
            });
            spark
            .send(
              'noreply@peopleinfinia.com',
                'rajdev.rohini@peopleinfinia.com',
              // 'eswar0221@gmail.com',
              'New user registration',
              adhtmlContent,
              ''
            )
            .then(function(result1) {
              if (err) {
                res.send({ responseMessage: 'err', responseCode: 500 });
              } else {
              }
            })
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

  forget_password: function(req, res) {
    console.log('req---', req.body);
    User.findOne({ email_id: req.body.email_id }, function(err, result) {
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
              User.update(
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

  // test
  get_profile: function(req, res) {
    // console.log('@@@@@@@@@@@enter the data ',req.body,req.params);
    User.findOne({ _id: mongoose.Types.ObjectId(req.params._id) },function(
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

  account_verification: function(req, res) {
    User.findOne({ _id: mongoose.Types.ObjectId(req.params._id) }, function(
      err,
      result
    ) {
      if (err) {
        res.send({ responseMessage: 'server err', responseCode: 500 });
      } else if (result.is_emailVerify == true) {
        res.send({ responseMessage: 'Already Verified!!!', responseCode: 204 });
      } else {
        let toUpdate = { is_emailVerify: true };
        let timeline = {
          action: 'email-verification',
          status: 'completed',
          date: Date.now(),
        };

        // if (result.user_type == 0) toUpdate.status = 'active';

        User.update(
          { _id: mongoose.Types.ObjectId(req.params._id) },
          { $set: toUpdate, $push: { timeline } },
          function(err, finalResult) {
            res.redirect('/');
          }
        );
      }
    });
  },

  login: async function(req, res) {
    /* console.log("req.body", req.body)
    User.findOne({ email_id: req.body.email_id, password: req.body.password, is_emailVerify: true }, { user_type: 1, user_name: 1, is_first_login: 1 }, function (err, result) {
      if (err) {
        res.send({
          responseMessage: "server err",
          responseCode: 500
        })
      }
      else if (!result) {
        res.send({
          responseMessage: "Email or password is invalid.",
          responseCode: 204
        })
      }
      else {
        User.update({ _id: mongoose.Types.ObjectId(result._id) }, { $set: { is_first_login: true } }, function (err, result3) {
          const token = user_save.generateAuthToken();
          res.send({ responseCode: 200, responseMessage: "Login sucessfully", result: result, token: _token })
        })
      }
    }); */

    // validate email and password
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find user by provided email id
    let user = await User.findOne({ email_id: req.body.email_id });
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
    await User.update(
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

  edit_profile: function(req, res) {
    delete req.body._id;
    console.log("running...");
    waterfall(
      [
        function(cb) {
          if (req.body.profile_pic) {
            if (req.body.profile_pic.match(/\.(jpeg|jpg|gif|png)$/) != null) {
              // check if url contains image extension or not.
              cb(null, 'done');
            } else {
              // else process the base64 string to create image.
              var img_base64 = req.body.profile_pic;
              var binaryData = new Buffer(img_base64, 'base64');
              require('fs').writeFile(
                'profile.jpeg',
                binaryData,
                'binary',
                function(err) {
                  console.log(err);
                }
              );
              cloudinary.uploader.upload('profile.jpeg', function(result) {
                req.body.profile_pic = result.url;
                cb(null, result);
              });
            }
          } else {
            console.log('enter in pdf else');
            req.body.profile_pic = 'https://i.stack.imgur.com/l60Hf.png';
            cb(null, 'done');
          }
        },
        function(result, cb) {
          if (req.body.naukri_portal_login == 'YES')
            req.body.naukri_portal_login = true;
          if (req.body.naukri_portal_login == 'NO')
            req.body.naukri_portal_login = false;

          // console.log('req.body: ', req.body, req.params._id);
          User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params._id) },
            { $set: req.body },
            { new: true },
            function(err, finalResult) {
              if (err) {
                console.log('userupdate: If', err);
                cb(null);
              } else {
                console.log('userupdate: Else', finalResult);
                cb(null, finalResult);
              }
            }
          );
        },
      ],
      function(err, result) {
        if (err) {
          res.send({ responseMessage: 'server err', responseCode: 500 });
        } else {
          res.send({
            responseMessage: 'Successfully updated.',
            responseCode: 200,
            result: result,
          });
        }
      }
    );
  },

  change_password: function(req, res) {
    console.log('req---', req.body);
    User.findOne(
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
          User.update(
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

  // To do
  get_submit_issue: async function(req, res) {
    const userIssue = await UserIssue.findOne({ _id: req.params._id })
      .populate({ path: 'user', select: 'user_name' })
      .populate({ path: 'issue', select: 'question' });
    res.send(userIssue);
  },

  post_submit_issue: async function(req, res) {
    const { error } = validateUserIssue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userIssueCount = await UserIssue.countDocuments({
      user: req.body.user,
      issue: req.body.issue,
      'timeline.status': { $ne: 'closed' },
    });
    if (userIssueCount)
      return res
        .status(400)
        .send(
          'You cannot submit same issue again, untill the previous issue gets closed.'
        );

    let userIssue = new UserIssue({
      user: req.body.user,
      issue: req.body.issue,
      timeline: { status: 'created', date: Date.now() },
    });
    userIssue = await userIssue.save();

    res.send(userIssue);
  },


  get_order_id: (req, res) => {
    console.log("###",req.body)
    var  key_secretsss= 'sYtcwFWxHKj2xIlW738GWLO5'   //https://api-b2b.peopleinfinia.in/user/verfication_payment
    var  key_secrets=  'cJ9ctVC5HxSkvpxlGWyjEoqx' // https://peopleinfinia.in/user/verfication_payment   new eswar setup 26 apri 2022
    
    var key_ids= 'rzp_live_2Mb6RFGFi1H047'
    var instance = new Razorpay({
      // key_id: key_id,
      key_id: 'rzp_live_2Mb6RFGFi1H047',
      // key_secret: key_secret
      key_secret:'cJ9ctVC5HxSkvpxlGWyjEoqx'
    });
    var amount = parseInt(req.body.amount);
    var orderedAmount;

    function orderGenerate(amount) {
      var options = {
        amount,
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: '1'
      };

      instance.orders.create(options, function(err, order) {
        if (err) {
          console.log("Razor pay err",err)
          res.status(500).json({
            responseCode: 500,
            responseMsg: 'razorpay Error'
          })
        }
        else{
          var obj = {
            user_id: req.user._id,
            order_id: order.id,
            amount: order.amount
          }
          var orders = new Orders(obj);
          orders.save(async (err, result) => {
            if (err) {
              res.status(500).json({
                success: false,
                responseCode: 500,
                responseMsg: 'Server Error'
              })
            }
              else {
                await res.status(200).json({
                  success: true,
                  responseCode: 200,
                  responseMsg: result
                })
              }
          })
        }
      })
    }

      User.findOne({ _id: mongoose.Types.ObjectId(req.user._id) }, (err, result12) => {
        if (err) {
          res.status(500).json({
            responseCode: 500,
            responseMsg: 'Server Error'
          })
        }
        else {
          if ('billing_address' in result12) {
            if (
              result12.billing_address.address === undefined || result12.billing_address.city === undefined ||
              result12.billing_address.address === '' ||  result12.billing_address.city === '' ||
              result12.billing_address.state === '' ||  result12.billing_address.pincode === '' ||
              result12.billing_address.state === undefined ||  result12.billing_address.pincode === undefined) {
                res.status(404).json({
                  success: false,
                  responseCode: 404,
                  responseMessage: 'Please Fill Billing Address'
                })
              } else {
            if (req.body.amount === '59900') {
              orderedAmount = (amount * 18)/100;
              orderedAmount = amount + orderedAmount;
              orderGenerate(orderedAmount);
            }
            else if (req.body.amount === '600000') {
              orderedAmount = (amount * 18)/100;
              orderedAmount = amount + orderedAmount;
              orderGenerate(orderedAmount);
            }
            else if (req.body.amount === '89900') {
              orderedAmount = (amount * 18)/100;
              orderedAmount = amount + orderedAmount;
              orderGenerate(orderedAmount);
            }
            else if (req.body.amount === '39900') {
              orderedAmount = (amount * 18)/100;
              orderedAmount = amount + orderedAmount;
              orderGenerate(orderedAmount);
            }
            else if (req.body.amount === '60000' || req.body.amount === '150') {
              orderedAmount = (amount * 18)/100;
              orderedAmount = amount + orderedAmount;
              orderGenerate(orderedAmount);
            }
            else {
              res.status(204).json({
                responseCode: 204,
                responseMsg: 'Something Wrong With Server'
              })
            }
          }
        }else {
          res.status(404).json({
            success: false,
            responseCode: 404,
            responseMessage: 'Please Fill Billing Address'
          })
        }
      }
    })

},

verification_payment: (req, res) => {    // req.body gives razorpay_order_id, razorpay_payment_id amount
console.log("verification_payment  b2b b2b User",req.body);  // req.body gives razorpay_order_id, razorpay_payment_id amount
 var artic=req.body.article

  var payload = artic.payload.payment.entity;
  var signature = req.header('x-razorpay-signature');
  var payment_id = payload.id;
  var paid_amount = payload.amount;
//console.log("b2b signature paid_amount  (artic.signature)",signature,paid_amount,artic.signature,artic.generated_signature);

  var reqBody = JSON.stringify(req.body.article);
  //console.log('reqBody JSON.stringify',reqBody)

    var  key_secretsds= 'sYtcwFWxHKj2xIlW738GWLO5'   //https://api-b2b.peopleinfinia.in/user/verfication_payment
    var  key_secrets=  'cJ9ctVC5HxSkvpxlGWyjEoqx' // https://peopleinfinia.in/user/verfication_payment   new eswar setup 26 apri 2022
        var key_ids= 'rzp_live_2Mb6RFGFi1H047'
 // var generated_signature =  Razorpay.validateWebhookSignature(reqBody, signature, key_secrets);
 // var generated_signature =  Razorpay.validateWebhookSignature(reqBody, artic.signature, key_secrets);
  //console.log('generated_signature',generated_signature)
  // =='order.paid' payload.status == "captured" != 'payment.failed' "captured":true, 
 if (artic.generated_signature && artic.event =='order.paid' && payload.status == "captured" && payload.captured==true) {
    var resume_viewed;
    var subscription_expired_on;
    var sub_type;
    if ( paid_amount === 70682 ) {
          resume_viewed = 100
          sub_type = 'Monthly';
          subscription_expired_on = new Date(Date.now() + (1000 * 86400 * 30))
    }
    if (paid_amount === 708000 ) {
          resume_viewed = 1500;
          sub_type = 'Yearly';
          subscription_expired_on = new Date(Date.now() + (1000 * 86400 * 365))
    }
    if (paid_amount === 70800 || paid_amount === 177) {
      resume_viewed = 100
      sub_type = 'Monthly';
      subscription_expired_on = new Date(Date.now() + (1000 * 86400 * 30))
  }
      Orders.find({"invoiceNo": {$exists: true}}).sort({"invoiceNo" : -1}).limit(1).exec((err, docs) => {
        console.log('here');
        if (err) {
          res.status(200).json({
            responseCode: 200,
            responseMessage: 'Error In Invoice Number',
            gets:false
          })
        }else {
        //  console.log(' Orders.find({"invoiceNo',docs)


            // let invoiceCount = parseInt(docs[0].invoiceNo);
            // invoiceCount = invoiceCount + 1;
            var invoiceCount;

            if(docs.length>0){
               invoiceCount = parseInt(docs[0].invoiceNo);
            //  console.log("invoiceCount inv",invoiceCount);
      
      
              invoiceCount = invoiceCount + 1;
            }else{
              invoiceCount = 0 + 1;
      
            }
            Orders.findOne({ order_id: payload.order_id, amount: payload.amount }, async (err, docRes ) => {
              if (err) {
               res.status(500).json({
                 responseCode: 500,
                 responseMsg: 'Server Error',
                 gets:false
               })
              } else {
                var obj = {
                 status: payload.status,
                 payment_id,
                 invoiceNo: invoiceCount,
                 updated_at: artic.created_at,
                 paymnet_mode: payload.method,
                }
               await Orders.findOneAndUpdate({ order_id: payload.order_id },obj, {new: true}, async (err, resultOrder ) => {
                 if (err) {
                   console.log(err);
                   res.status(500).json({
                     responseCode: 500,
                     responseMsg: 'Server Error',
                     gets:false
                   })
                 }
                 else {
                  console.log('resultOrder%%%%%%')
                   var updateData = {
                      $push: {subscription_plan:  {
                        type: sub_type,
                        payment_id: payment_id,
                        sub_date: Date.now()
                      } },
                       subscription_active: true,
                       resume_viewed: resume_viewed,
                       subscription_expired_on: subscription_expired_on
                   }
                   updateData
                  console.log('updateData',updateData)

                   await User.findOneAndUpdate({ _id: resultOrder.user_id}, updateData, {upsert: true}, async (err, result) => {
                     if (err) {
                       res.status(500).json({
                         responseCode: 500,
                         responseMsg: 'Server Error',
                         gets:false

                       })
                     }
                     else {
console.log('result @@@@@@@@@@@@@@@@@');
                      await res.status(200).json({
                         responseCode: 200,
                         responseMsg: result,
                         gets:true

                       })
                     }
                   })
                 }
               })
              }
            })
          }
       })
} else {
       res.status(200).json({
         responseCode: 200,
         responseMessage: 'Payment Not Successful. Invalid Transcation'
       })
     }
},

create_invoice: (req,res) => {
  console.log(req.body.user_id)
  Orders.findOne({ user_id: mongoose.Types.ObjectId(`${req.body.user_id}`), payment_id: req.body.pay_id }).populate('user_id').exec((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        responseCode: 500,
        responseMsg: 'Server Error'
      })
    }
    else {
      res.status(200).json({
        responseCode: 200,
        responseMsg: result
      })
    }
  })

},
postCources:(req, res)=>{
  var cources = new cource(req.body);
  cources.save(function(err, result) {
          if(err){
          res.send({ responseMessage: 'err', responseCode: 500 })}
          else{
          res.send({
            responseMessage: 'certification Registered',
            responseCode: 200,
          });
        }
        })
},
edit_Cources: async function(req, res) {
  // console.log('edit_profile > req.params: ', req.params);

  // console.log('BeforeOnboarding update req.body: ', req.body, );
  cource.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body._id) },
    { $set: req.body },
    { new: true },
    function(err, finalResult) {
      if (err) {
        console.log('Cource: If', err);
        res
          .status(500)
          .send({ responseMessage: 'server err', responseCode: 500 });
      } else {
        // console.log('Cource edit: Else', finalResult);
        res.status(200).send({
          responseMessage: 'Successfully updated.',
          responseCode: 200,
          result: finalResult,
        });
      }
    }
  );
},
get_All_corpo_Cources: (req,res) => {
  // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
      const query = cource.find({recruiter_id: mongoose.Types.ObjectId(req.params._id)})
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
get_courcebyId_detail: (req,res) => {
  // pmsUser.findById(req.body.id).select({"password": 0, "applied_jobs":0}).exec((err,docs) => {
    console.log("DDDDDDDDD",req.params)
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

rsume_view: (req, res) => {
  console.log('heez');
  User.findById(mongoose.Types.ObjectId(req.user._id), (err, userData)=> {
    console.log('heez2');
    if (err) {
      res.status(500).json({
        responseCode: 500,
        responseMessage: 'Server Error'
      })
    }
    else if (userData) {
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.user._id), { $inc : {resume_viewed: -1}}, (err, docs)=> {
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
            result: docs
          })
        }
      })
    }
    else {
      res.status(404).json({
        responseCode: 404,
        responseMessage: 'User Not Found'
      })
    }

  })
}







};

module.exports = user_api;
