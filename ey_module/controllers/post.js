var User = require('../mongo_handler/user.js')
var Userpost = require('../mongo_handler/post.js')
var path = require('path')
var emailer = require('../global_vars/mailerfunction.js')
var spark = require('../global_vars/sparkpost.js')
var postcount = require('../mongo_handler/postcount.js')
var Usercandidate = require('../mongo_handler/candidate.js')
var industry = require('../mongo_handler/industry.js')
var functionArea = require('../mongo_handler/functional.js')
var mongoose = require("mongoose")
var waterfall = require('async-waterfall');
var xmlCsvParser = require('../global_vars/xmlcsvParser.js')
var cloudinary = require('cloudinary');
var interview = require('../mongo_handler/interview.js')
var fs = require('fs')
var async = require("async");

cloudinary.config({
    cloud_name: 'dpijyjulg',
    api_key: '344142488787362',
    api_secret: 'E6textvz7MZkvU4H-zw4L2Ybxmw'
  });

function getCandidateCount(email, mobile, cb) {
    Usercandidate.countDocuments({ "candidates.email": email, "candidates.phone_number": mobile }, (err, res) => {
        cb(res);
    });
}

var user_post = {
    ping: function (req, res) {
        res.status(200).send('OK');
        Usercandidate.findOne({ _id: '5c4025309dd1015f0126c1e8' }, function (err, data) {
            const result = data.candidates.filter(d => d.name === 'Ryan');
            console.log('result._id: ', result[0]._id);
        });
    },

    // if (req.body.doc && req.body.doc.value) {
    // let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
    // let fileExt = req.body.doc.filename
    //   .split('.')
    //   .pop()
    //   .toLowerCase();
    // if (allowedExt.includes(fileExt)) {
    //   try {
    //     let resumeName = req.body.doc.filename;
    //     let resumeFileName = `resume_${randomNumber}`;
    //     let startingPath = path.join(__dirname, "../..");
    //     let resume_path_db =  `${startingPath}/public/${resumeFileName}.${fileExt}`;
    //     let resume_path = `https://peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
    //     let buff = new Buffer(req.body.doc.value, 'base64');
    // fs.writeFileSync(resume_path_db, buff,async(err)=>{
    //     if(err)
    //     return res
    //     .status(500)
    //     .send(
    //       `Error in uploading resume.`);
    //       else
    //       await console.log('done');
    //   });
    // req.body.doc = result.url
// };

    client_post: function (req, res) {
        console.log("job post",req.body)
        console.log("11req.body.sampleCV");

        req.body["post_user_id"]=req.user._id;
        waterfall([
            function (cb) {
                // if (req.body.sampleCV != undefined && req.body.sampleCV.length>500) {
                //         let pdf_base64 = req.body.sampleCV;
                //         let binaryData = new Buffer(pdf_base64, 'base64');

                //         let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                //         let resumeFileName = `SampleCV_${randomNumber}`;
                //         let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;

                //         fs.writeFile(resumeFileNameWithPath, binaryData, "binary", function (err) {

                //             cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
                //                 console.log("result cbv------>> " + JSON.stringify(result));
                //                 req.body.sampleCV = result.url;
                //                 fs.unlinkSync(resumeFileNameWithPath);
                //                 cb(null, result.url);
                //             }, { public_id: resumeFileName });
                //         });
                //     }
                //     let pdf_base64 = req.body.sampleCV;
                //     let binaryData = new Buffer(pdf_base64, 'base64');
                //     fs.writeFile("JD.pdf", binaryData, "binary", function (err) {
                //         console.log(err);
                //     });
                //     cloudinary.uploader.upload("JD.pdf",  function (result) {
                //         console.log("pdg CV url---->" + JSON.stringify(result.url));
                //         req.body.sampleCV = result.url;
                //         cb(null, result);
                //     }, { public_id: 'document_pdf' })
                // }
                // else if(req.body.sampleCV != undefined && req.body.sampleCV.length<500){
                //     cb(null, 'done');
                // }
                //  else {
                //     console.log("enter in pdf else");
                //     req.body.sampleCV = "";
                //     cb(null, 'done');
                // }
                console.log("22req.body.sampleCV",req.body.sampleCV);
if(req.body.sampleCV != undefined){
    if (req.body.sampleCV && req.body.sampleCV.value) {
        console.log("22req.body.sampleCV");
        let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
        let fileExt = req.body.sampleCV.filename
          .split('.')
          .pop()
          .toLowerCase();
        if (allowedExt.includes(fileExt)) {
        console.log("333req.body.sampleCV");

        //   try {
            let resumeName = req.body.sampleCV.filename;
            let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
            let resumeFileName = `SampleCV_${randomNumber}`;
// let startingPath = path.join(__dirname, "../..");
// let resume_path_db =  `${startingPath}/public/jds/${resumeFileName}.${fileExt}`;
// let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
let resumeFileNameWithPath = `./public/${resumeFileName}.${fileExt}`;
let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
//  let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;

let buff = new Buffer(req.body.sampleCV.value, 'base64');
fs.writeFileSync(resumeFileNameWithPath, buff,async(err)=>{
if(err){}
  else{
    // cb(null, resume_path);

  await console.log('done')}
});
req.body.sampleCV = resume_path
    cb(null, resume_path);

    // } catch (err) {
    // cb(null, 'done');

    //     delete req.body.doc;
    //   }
    } else {
    //   return res
    //     .status(400)
    //     .send(
    //       `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
    //         ', '
    //       )} only.`
    //     );
    cb(null, 'done');

    }
    } else{
        cb(null, 'done');
    
    }

}else{
    cb(null, 'done');

}
            
            },
            function (docresult, cb) {
                // if (req.body.doc != undefined && req.body.doc.length > 500) {
                //     console.log("NOOOOOOOOOOOOOOOO")
                //     let pdf_base64 = req.body.doc;
                //     let binaryData = new Buffer(pdf_base64, 'base64');

                //     let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                //     let resumeFileName = `doc_${randomNumber}`;
                //     let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;

                //     fs.writeFile(resumeFileNameWithPath, binaryData, "binary", function (err) {
                //         console.log('err: ', err);

                //         cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
                //             console.log("result------>> " + JSON.stringify(result));
                //             req.body.doc = result.url;
                //             fs.unlinkSync(resumeFileNameWithPath);
                //             cb(null, result.url);
                //         },
                //          { public_id: resumeFileName }
                //          );
                //     });
                // }
                  // else if(req.body.doc != undefined && req.body.doc.length < 500){
            //     cb(null, 'done');
            // }
            //  else {
            //     console.log("enter in pdf else");
            //     req.body.doc = "";
            //     cb(null, 'done');
            // }
            console.log("doc 22req.body.doc",req.body.doc);
            if(req.body.sampleCV != undefined){

                 if (req.body.doc && req.body.doc.value) {
    let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
    let fileExt = req.body.doc.filename
      .split('.')
      .pop()
      .toLowerCase();
    if (allowedExt.includes(fileExt)) {
        
    //   try {
        let resumeName = req.body.doc.filename;
        let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number

        let resumeFileName = `JD_${randomNumber}`;
        // 'dist/employerYaari/index.html'
     
        // let startingPath = path.join(__dirname, "../../public/jds" + resumeFileName + '.'+ fileExt);
        // console.log('DDDDDD3',startingPath)
        // fs.writeFile(resumeFileNameWithPath, binaryData, "binary", function (err) {

        //     cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
        //         console.log("result cbv------>> " + JSON.stringify(result));
        //         req.body.sampleCV = result.url;
        //         fs.unlinkSync(resumeFileNameWithPath);
        //         cb(null, result.url);
        //     }, { public_id: resumeFileName });
        // });
        // let resume_path_db =  `${startingPath}/${resumeFileName}.${fileExt}`;
        // console.log('DDDDDD',resume_path_db)
        // let resumeFileName = `SampleJD_${randomNumber}`;
        let resumeFileNameWithPath = `./public/${resumeFileName}.${fileExt}`;
        let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
        let buff = new Buffer(req.body.doc.value, 'base64');
    fs.writeFileSync(resumeFileNameWithPath, buff,async(err)=>{
        if(err){}
          else{
          await console.log('done')}

      });
    req.body.doc = resume_path
    cb(null, resume_path);

    //   }
} else {
//   return res
//     .status(400)
//     .send(
//       `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
//         ', '
//       )} only.`
//     );
cb(null, 'done');

}
} else{
    cb(null, 'done');

} 
            }
            else {
                //   return res
                //     .status(400)
                //     .send(
                //       `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
                //         ', '
                //       )} only.`
                //     );
                cb(null, 'done');
                
                }
// else delete req.body.cv;
//     let pdf_base64 = req.body.sampleCV;
            //     let binaryData = new Buffer(pdf_base64, 'base64');
            //     fs.writeFile("JD.pdf", binaryData, "binary", function (err) {
            //         console.log(err);
            //     });
            //     cloudinary.uploader.upload("JD.pdf",  function (result) {
            //         console.log("pdg CV url---->" + JSON.stringify(result.url));
            //         req.body.sampleCV = result.url;
            //         cb(null, result);
            //     }, { public_id: 'document_pdf' })
            // }
          
        },
            //     if (req.body.doc) {
            //         let pdf_base64 = req.body.doc;
            //         let binaryData = new Buffer(pdf_base64, 'base64');
            //         fs.writeFile("JD.pdf", binaryData, "binary", function (err) {
            //             console.log(err);
            //         });
            //         cloudinary.uploader.upload("JD.pdf",  function (result) {
            //             console.log("pdg doc url---->" + JSON.stringify(result.url));
            //             req.body.doc = result.url;
            //             cb(null, result);
            //         }, { _id: 'document_pdf' })
            //     } else {
            //         console.log("enter in pdf else");
            //         req.body.doc = "";
            //         cb(null, 'done');
            //     }
            // },
            function (docresult, cb) {
                var post_save = new Userpost(req.body)
                post_save.save(function (err, result) {
                    if (err) {
                        console.log('err --->', err);
                        cb(null, err)
                    }
                    else {
                        console.log('derce', result);
                        var htmlContent = spark.clientPostHtml(req.body.company_name, req.body.email_id, result.job_title, result.vacancy)
                        let mailsend = ["rohini@peopleinfinia.com", "support@peopleinfinia.com"]
                        // for (let i = 0; i < mailsend.length; i++) {
                        //     spark.send('noreply@peopleinfinia.com', mailsend[i], 'Client New Post', htmlContent,"").then(function (result1) {
                        //         if (err) {
                        //             cb(null, "some thing wrong with mail")
                        //         }
                        //     })
                        // }
                        cb(null, result)
                    }
                })
            },
            function (result, cb) {
                console.log("result",result);
                User.findOne({ _id: mongoose.Types.ObjectId(result.user_id) }, function (err, clientResult) {
                    var secoundHtmlContent = spark.clientreciveJObPostHtml(result.job_title)
                console.log("clientResult",clientResult);

                    spark.send('noreply@peopleinfinia.com', clientResult.email_id, 'Client New Post', secoundHtmlContent,"").then(function (result1) {
                        cb(null, result1)
                    })
                })
            }
        ], function (err, sucess) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500
                })
            }
            else {
                res.send({
                    responseMessage: "save sucessfully",
                    responseCode: 200
                })

            }
        })

        //    client_post : function(req,res){
        // 	console.log("req----",req.body)
        // 	waterfall([
        // 	function(cb){
        // 	if(req.body.doc){
        // 	var pdf_base64 = req.body.doc;
        // 	var binaryData = new Buffer(pdf_base64, 'base64');
        // 	fs.writeFile("JD.pdf", binaryData, "binary", function (err) {
        // 	console.log(err);
        // 	});
        // 	cloudinary.uploader.upload("JD.pdf",function(result) {
        // 	console.log("pdg doc url---->"+JSON.stringify(result.url));
        // 	req.body.doc=result.url;
        // 	cb(null,result);
        // 	}, {public_id: 'document_pdf'})
        // 	} else{
        // 	console.log("enter in pdf else");
        // 	req.body.doc= "";
        // 	cb(null,'done');
        // 	}

        // 	},
        // 	function(docresult,cb){
        // 	var post_save = new Userpost(req.body)
        // 	post_save.save(function(err,result){
        // 	console.log("result---",result)
        // 	if(err){
        // 	console.log("err---",err)
        // cb(null,err)

        // 	}
        // 	else{
        //                       var htmlContent=spark.clientPostHtml(result.user_name,req.body.email_id,result.job_title,result.vacancy)
        //                       let mailsend = ["sandeep@peopleinfinia.com","rohini@peopleinfinia.com","support@peopleinfinia.com"]
        //                       for(let i =0;i<mailsend.length;i++){
        //                            spark.send('noreply@peopleinfinia.com',mailsend[i],'Client New Post',htmlContent).then(function(result1) {
        //                                if(err){
        //                                    cb(null,"some thing wrong with mail")
        //                                }
        //                            })

        //                       }



        // 	}
        //                           cb(null,result)

        // 	})

        // 	},
        //                           function(result,cb){
        //                               User.findOne({_id: mongoose.Types.ObjectId(result._id)},function(err,clientResult){
        //                              var secoundHtmlContent=spark.clientreciveJObPostHtml(result.job_title)
        //                              spark.send('noreply@peopleinfinia.com',clientResult.email_id,'Client New Post',secoundHtmlContent).then(function(result1) {
        //                                    cb(null,result)
        //                               })
        //                               })
        //                           }
        // 	],function(err,sucess){
        //                           if(err){
        //                               	res.send({
        // 	responseMessage :"server err",
        // 	responseCode :500
        // 	})
        //                           }
        //                           else{
        //                       res.send({
        // 	responseMessage :"save sucessfully",
        // 	responseCode :200
        // 	})

        //                           }
        //                       })

        // waterfall([
        // (callback)=>{
        // get_count({booking_count:1},callback);
        // },
        // (booking_count,callback)=>{
        // console.log('order_count-->'+booking_count);
        // req.body.job_id = booking_count.booking_count;
        // var post_save = new Userpost(req.body)
        // post_save.save(function(err,result){
        // if(err){
        // callback(err,null)
        // }
        // else{
        // callback(null,result);
        // }
        // });

        // }
        // ],function(err,success){
        // console.log("success",success)
        // if(err){
        // res.send({
        // responseMessage :"server err",
        // responseCode :500
        // })

        // }
        // else{
        // res.send({
        // responseMessage :"save sucessfully",
        // responseCode :200
        // })


        // }
        // })

    },

    change_job_post_status: function (req, res) { // pause  // delete
        console.log("req---", req.body)
        Userpost.findOneAndUpdate({ _id: req.params.post_id }, { $set: { status: req.body.status } }, { new: true }, function (err, result) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500
                })

            }
            else {
                res.send({
                    responseMessage: "data change",
                    responseCode: 200,
                    result: result
                })

            }

        })

    },

    manange_job_listing: function (req, res) {
        console.log("req.params---", req.params)
        User.post.find({}, function (err, result) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500

                })

            }
            else if (result.length == 0) {
                res.send({
                    responseMessage: "No job found",
                    responseCode: 204

                })

            }
            else {
                res.send({
                    responseMessage: "All data found",
                    responseCode: 200,
                    result: result
                })

            }

        })


    },
    edit_post:async function (req, res) {
        // console.log('767',req.body);
        // console.log('768',req.body.sampleCV);
      //    if (req.body.doc.length>200) {
      //                  var pdf_base64 = req.body.doc;
      //                 var binaryData = new Buffer(pdf_base64, 'base64');
      //                await fs.writeFile("JD.pdf", binaryData, "binary", function (err) {
      //                     console.log(err);
      //                 });
      //                await cloudinary.uploader.upload("JD.pdf", function (result) {
      //                         console.log("pdg doc url---->" + JSON.stringify(result.url));
      //                         req.body.doc = result.url;
      //                     }, { public_id: 'document_pdf' })
      //                 } else if (req.body.doc === "") {
      //                     console.log("enter in pdf else");
      //                     req.body.doc = "";
      //                 }
      //                 else{
      //                     console.log("Every thing is cool")
      //                 }
if(req.body.doc != undefined){

      if (req.body.doc && req.body.doc.value) {
          let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
          let fileExt = req.body.doc.filename
            .split('.')
            .pop()
            .toLowerCase();
          if (allowedExt.includes(fileExt)) {
            // try {
                console.log("fileExt",fileExt)
                let resumeName = req.body.doc.filename;
                let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                let resumeFileName = `JD_${randomNumber}`;
                // let resumeFileNameWithPath = `./public/${resumeFileName}.${fileExt}`;
                // https://api-b2b.peopleinfinia.in
                // let resumeFileNameWithPath = `${resumeFileName}.${fileExt}`;
                // console.log("resumeFileNameWithPath",resumeFileNameWithPath)

                // let buff = new Buffer(req.body.doc.value, 'base64');
                // await  fs.writeFile(resumeFileNameWithPath,buff, async(err)=> {
                //     console.log('err: ', err);
                // });

                //     await cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
                //         console.log("eswar result------>> " + JSON.stringify(result));
                //         req.body.doc = result.url;
                //         fs.unlinkSync(resumeFileNameWithPath);
                //         // cb(null, result.url);
                //     },
                //      { public_id: resumeFileName }
                //      );


                        //  let startingPath = path.join(__dirname, "../..");
                        //  console.log('DDDD333DD',startingPath)

                        //  let resume_path_db =  `${startingPath}/public/jds/${resumeFileName}.${fileExt}`;
                        //  console.log('DDDD222DD',resume_path_db)
                         let resume_path_db = `./public/${resumeFileName}.${fileExt}`;
                         let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
                        //  let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
                         let buff = new Buffer(req.body.doc.value, 'base64');
                        //  console.log('DDDDDD111',resume_path_db)
                     fs.writeFileSync(resume_path_db, buff,async(err)=>{
                         if(err){}
                           else{
                           await console.log('done')}
                       });
                     req.body.doc = resume_path
      } else {
        // res.send({
        //     responseMessage: 'Uploaded jd is not allowed file type',
        //      responseCode: 500
        //       })
        // return res
        //   .status(400)
        //   .send(
        //     `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
        //       ', '
        //     )} only.`
        //   );
      }
      } 
    }
                    //   if (req.body.sampleCV.length>200) {
                    //     var pdf_base64 = req.body.sampleCV;
                    //    var binaryData = new Buffer(pdf_base64, 'base64');
                    //   await fs.writeFile("CV.pdf", binaryData, "binary", function (err) {
                    //        console.log(err);
                    //    });
                    //   await cloudinary.uploader.upload("CV.pdf", function (result) {
                    //            console.log("pdg doc url---->" + JSON.stringify(result.url));
                    //            req.body.sampleCV = result.url;
                    //        }, { public_id: 'document_pdf' })
                    //    } 
                    //    else if (req.body.sampleCV === "") {
                    //        console.log("enter in pdf else");
                    //        req.body.sampleCV = "";
                    //    }
                    //    else{
                    //        console.log("Every thing is cool")
                    //    }
if(req.body.sampleCV != undefined){

                    if (req.body.sampleCV && req.body.sampleCV.value) {
                        let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
                        let fileExt = req.body.sampleCV.filename
                          .split('.')
                          .pop()
                          .toLowerCase();
                        if (allowedExt.includes(fileExt)) {
                        //   try {
                            let resumeName = req.body.sampleCV.filename;
                            let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                            let resumeFileName = `SampleCV_${randomNumber}`;
                // let startingPath = path.join(__dirname, "../..");
                // let resume_path_db =  `${startingPath}/public/jds/${resumeFileName}.${fileExt}`;
                // let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
                let resumeFileNameWithPath = `./public/${resumeFileName}.${fileExt}`;
                let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
               //  let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
               
                let buff = new Buffer(req.body.sampleCV.value, 'base64');
            fs.writeFileSync(resumeFileNameWithPath, buff,async(err)=>{
                if(err){}
                  else{
                    // cb(null, resume_path);
        
                  await console.log('done')}
              });
            req.body.sampleCV = resume_path
        
                    // } catch (err) {
                    // cb(null, 'done');
        
                    //     delete req.body.doc;
                    //   }
                    } else {
                    //   return res
                    //     .status(400)
                    //     .send(
                    //       `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
                    //         ', '
                    //       )} only.`
                    //     );
                    // cb(null, 'done');
        
                    }
                    } 
                }
                      delete req.body.user_id
                    //   console.log("findByIdAndUpdatefindByIdAndUpdate",req.body)
              await  Userpost.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: req.body }, { new: true }, function (err, FinalResult) {
                  if (err) {
                                 res.send({
                               responseMessage: "Server err",
                                responseCode: 500
                                 })
                          }
                                          else {
                                              res.send({
                                                  responseMessage: "change sucessfully",
                                                  responseCode: 200
  
                                              })
                                          }
                                          })
          // waterfall([
          //     function (cb) {
          //         if (req.body.doc) {
          //             var pdf_base64 = req.body.doc;
          //             var binaryData = new Buffer(pdf_base64, 'base64');
          //             fs.writeFile("JD.pdf", binaryData, "binary", function (err) {
          //                 console.log(err);
          //             });
          //             cloudinary.uploader.upload("JD.pdf", function (result) {
          //                 console.log("pdg doc url---->" + JSON.stringify(result.url));
          //                 req.body.doc = result.url;
          //                 cb(null, result);
          //             }, { public_id: 'document_pdf' })
          //         } else {
          //             console.log("enter in pdf else");
          //             req.body.doc = "";
          //             cb(null, 'done');
          //         }
          //     },
          //     function (docresult, cb) {
          //         // console.log("req.body", req.body)
          //         // console.log("req.paras", req.params)
          //         Userpost.findOne({ _id: mongoose.Types.ObjectId(req.params._id) }, function (err, result) {
          //             if (err) {
          //                 res.send({
          //                     responseMessage: "Server err",
          //                     responseCode: 500
          //                 })
          //             }
          //             else if (!result) {
          //                 res.send({
          //                     responseMessage: "No job post with thsi id",
          //                     responseCode: 400
          //                 })
          //             }
          //             else {
          //                 delete req.body.user_id
          //                 Userpost.update({ _id: mongoose.Types.ObjectId(result._id) }, { $set: req.body , $set : draft_status = false }, { new: true }, function (err, FinalResult) {
          //                     console.log("FinalResult", FinalResult)
          //                     if (err) {
          //                         res.send({
          //                             responseMessage: "Server err",
          //                             responseCode: 500
          //                         })
          //                     }
          //                     else {
          //                         res.send({
          //                             responseMessage: "change sucessfully",
          //                             responseCode: 200
  
          //                         })
  
          //                     }
  
  
          //                 })
          //             }
  
  
  
          //         })
  
  
          //     }], function (err, sucess) {
          //         if (err) {
          //             res.send({
          //                 responseMessage: "server err",
          //                 responseCode: 500
          //             })
          //         }
          //         else {
          //             res.send({
          //                 responseMessage: "save sucessfully",
          //                 responseCode: 200
          //             })
  
          //         }
          //     })
      },
    save_draft_post: function (req, res) {
        // console.log("save_draft_post",req.body);
        waterfall([
            function (cb) {
                // if (  req.body.sampleCV != undefined &&req.body.sampleCV.length>500) {
                //         let pdf_base64 = req.body.sampleCV;
                //         let binaryData = new Buffer(pdf_base64, 'base64');

                //         let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                //         let resumeFileName = `SampleCV_${randomNumber}`;
                //         let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;

                //         fs.writeFile(resumeFileNameWithPath, binaryData, "binary", function (err) {
                //             console.log('err: ', err);

                //             cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
                //                 console.log("result------>> " + JSON.stringify(result));
                //                 req.body.sampleCV = result.url;
                //                 fs.unlinkSync(resumeFileNameWithPath);
                //                 cb(null, result.url);
                //             }, { public_id: resumeFileName });
                //         });
                //     }
                // else if( req.body.sampleCV != undefined && req.body.sampleCV.length!=""){
                //     cb(null, 'done');
                // }
                //  else  {
                //     console.log("enter in pdf else");
                //     req.body.sampleCV = "";
                //     cb(null, 'done');
                // }
if(req.body.sampleCV != undefined){

                if (req.body.sampleCV && req.body.sampleCV.value) {
                    let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
                    let fileExt = req.body.sampleCV.filename
                      .split('.')
                      .pop()
                      .toLowerCase();
                    if (allowedExt.includes(fileExt)) {
                    //   try {
                        let resumeName = req.body.sampleCV.filename;
                        let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                        let resumeFileName = `SampleCV_${randomNumber}`;
            // let startingPath = path.join(__dirname, "../..");
            // let resume_path_db =  `${startingPath}/public/jds/${resumeFileName}.${fileExt}`;
            // let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
            let resumeFileNameWithPath = `./public/${resumeFileName}.${fileExt}`;
            let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
           //  let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
           
            let buff = new Buffer(req.body.sampleCV.value, 'base64');
        fs.writeFileSync(resumeFileNameWithPath, buff,async(err)=>{
            if(err){}
              else{
                // cb(null, resume_path);
    
              await console.log('done')}
          });
        req.body.sampleCV = resume_path
        cb(null, resume_path);
    
                // } catch (err) {
                // cb(null, 'done');
    
                //     delete req.body.doc;
                //   }
                } else {
                //   return res
                //     .status(400)
                //     .send(
                //       `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
                //         ', '
                //       )} only.`
                //     );
                cb(null, 'done');
    
                }
                } 
            }else{
                cb(null, 'done');

            }
            },
            function (docresult, cb) {

                // if ( req.body.doc != undefined &&req.body.doc.length>500) {
                //     let pdf_base64 = req.body.doc;
                //     let binaryData = new Buffer(pdf_base64, 'base64');

                //     let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                //     let resumeFileName = `doc_${randomNumber}`;
                //     let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;

                //     fs.writeFile(resumeFileNameWithPath, binaryData, "binary", function (err) {
                //         console.log('err: ', err);

                //         cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
                //             console.log("result------>> " + JSON.stringify(result));
                //             req.body.doc = result.url;
                //             fs.unlinkSync(resumeFileNameWithPath);
                //             cb(null, result.url);
                //         }, { public_id: resumeFileName });
                //     });
                // }
            //     else if( req.body.doc != undefined && req.body.doc.length!=""){
            //         cb(null, 'done');
            //     }
            //  else {
            //     console.log("enter in pdf else");
            //     req.body.doc = "";
            //     cb(null, 'done');
            // }
if(req.body.doc != undefined){

            if (req.body.doc && req.body.doc.value) {
                let allowedExt = ['pdf', 'doc', 'docx', 'rtf'];
                let fileExt = req.body.doc.filename
                  .split('.')
                  .pop()
                  .toLowerCase();
                if (allowedExt.includes(fileExt)) {
                //   try {
                    let resumeName = req.body.doc.filename;
                    let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                    let resumeFileName = `JD_${randomNumber}`;
        // let startingPath = path.join(__dirname, "../..");
        // let resume_path_db =  `${startingPath}/public/jds/${resumeFileName}.${fileExt}`;
        // let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
        let resume_path_db = `./public/${resumeFileName}.${fileExt}`;
        let resume_path = `https://api-b2b.peopleinfinia.in/cdn/${resumeFileName}.${fileExt}`;
       //  let resume_path = `https://api-b2b.peopleinfinia.in/cdn/jds/${resumeFileName}.${fileExt}`;
       
        let buff = new Buffer(req.body.doc.value, 'base64');
    fs.writeFileSync(resume_path_db, buff,async(err)=>{
        if(err){}
          else{
            // cb(null, resume_path);

          await console.log('done')}
      });
    req.body.doc = resume_path
    cb(null, resume_path);

            // } catch (err) {
            // cb(null, 'done');

            //     delete req.body.doc;
            //   }
            } else {
            //   return res
            //     .status(400)
            //     .send(
            //       `Uploaded jd is not allowed file type. Please upload ${allowedExt.join(
            //         ', '
            //       )} only.`
            //     );
            cb(null, 'done');

            }
            } 
        }else{
            cb(null, 'done');

        }
        },
            function (docresult, cb) {
                var post_save = new Userpost(req.body)
                post_save.save(function (err, result) {
                    console.log("result---", result)
                    if (err) {
                        console.log("err---", err)
                        res.send({
                            responseMessage: "server err",
                            responseCode: 500
                        })

                    }
                    else {
                        Userpost.findOneAndUpdate({ _id: mongoose.Types.ObjectId(result._id) }, { $set: { draft_status: true } }, function (err, secoundResult) {
                            if (err) {

                            }
                            else {
                                cb(null, secoundResult)
                            }
                        })

                    }

                })

            }

        ], function (err, sucess) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500
                })
            }
            else {
                res.send({
                    responseMessage: "done",
                    responseCode: 200
                })

            }
        })
    },

    recruiter_view_job: function (req, res) {
        console.log("req---", req.parms)
        Userpost.findOne({ _id: req.params._id, "status": "active" }).populate({ path: 'user_id', select: 'user_name' }).exec(function (err, result) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500
                })

            }
            else {
                res.send({
                    responseMessage: "find job post",
                    responseCode: 200,
                    result: result
                })

            }
        })

    },

    show_recuiter_dashbord_jobs: function (req, res) {  // need modification when recruiter fill profile
        Userpost.find({ "status": "active" , "draft_status": false }).sort({ 'created_at': -1 }).limit(3).exec(function (err, result) {
            if (err) {

                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                console.log(result)
                res.send({ responseMessage: "find job post", responseCode: 200, result: result });
            }
        })
    },
    show_recuiter_dashbord_All_jobs: function (req, res) {  // need modification when recruiter fill profile
        Userpost.find({ "status": "active" , "draft_status": false }).sort({ 'created_at': -1 }).exec(function (err, result) {
            if (err) {

                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                console.log(result)
                res.send({ responseMessage: "find job post", responseCode: 200, result: result });
            }
        })
    },
    /*
    show_recuiter_dashbord_jobs: function (req, res) {
        waterfall([
            function (cb) {
                console.log(`show_recuiter_dashbord_jobs > cb > 1: ${cb}`);
                User.findOne({ _id: mongoose.Types.ObjectId(req.params._user_id) }, { functional_expert: 1, industry_expert: 1, user_id: 1, user_name: 1 }, function (err, result) {
                    if (err) {
                        console.log(`show_recuiter_dashbord_jobs > findOne > IF: {err}`);
                        cb(null, err)
                    }
                    else {
                        console.log(`show_recuiter_dashbord_jobs > findOne > Else: ${result}`);
                        cb(null, result)
                    }
                })
            },
            function (result, cb) {
                console.log(`show_recuiter_dashbord_jobs > cb > 2: {cb} : ${result}`);

                let user_function_areas = result.functional_expert;
                let user_industries = result.industry_expert;

                Userpost.find({ '$and': [{ 'industry': { '$in': user_industries }, 'functional_area': { '$in': user_function_areas }, 'status': 'active' }] }).sort({ 'created_at': -1 }).limit(3).exec(function (err, result) {
                    if (err) {
                        cb(null, err);
                    }
                    else {
                        cb(null, result);
                    }
                });
            }
        ], function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                res.send({ responseMessage: "Successfully updated.", responseCode: 200, result: result });
            }
        });
    },
    */

    recruiter_all_job_list: function (req, res) {
        Userpost.find({ status: "active" , draft_status : false }).populate({ path: 'user_id', select: 'user_name' }).sort({ 'created_at': -1 }).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                res.send({ responseMessage: "find job post", responseCode: 200, result: result });
            }
        });
    },

    /*
    recruiter_all_job_list: function (req, res) {
        waterfall([
            function (cb) {
                console.log(`recruiter_all_job_list > cb > 1: ${cb}`);
                User.findOne({ _id: mongoose.Types.ObjectId(req.params._user_id) }, { functional_expert: 1, industry_expert: 1, user_id: 1, user_name: 1 }, function (err, result) {
                    if (err) {
                        console.log(`recruiter_all_job_list > findOne > IF: {err}`);
                        cb(null, err)
                    }
                    else {
                        console.log(`recruiter_all_job_list > findOne > Else: ${result}`);
                        cb(null, result)
                    }
                })
            },
            function (result, cb) {
                console.log(`recruiter_all_job_list > cb > 2: {cb} : ${result}`);

                let user_function_areas = result.functional_expert;
                let user_industries = result.industry_expert;

                Userpost.find({ '$and': [{ 'industry': { '$in': user_industries }, 'functional_area': { '$in': user_function_areas }, 'status': 'active' }] }).populate({ path: 'user_id', select: 'user_name' }).exec(function (err, result) {
                    if (err) {
                        // res.send({ responseMessage: "server err", responseCode: 500 });
                        cb(null, err);
                    }
                    else {
                        // res.send({ responseMessage: "find job post", responseCode: 200, result: result });
                        cb(null, result);
                    }
                });
            }
        ], function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                res.send({ responseMessage: "Successfully updated.", responseCode: 200, result: result });
            }
        });
    },
    */

    client_managae_jobs: function (req, res) {
        console.log("req.params----", req.params)
        Userpost.find({ user_id: mongoose.Types.ObjectId(req.params._id)}).sort({created_at: -1}).exec(function(err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No jobs found", responseCode: 204 })
            }
            else {
                res.send({ responseMessage: "No jobs found", responseCode: 200, result: result })
            }
        })
    },


    consultant_manage_jobs: function (req, res) {
        console.log("req----", req.params)

        var query = [{
            $match: {
                recruiter_id: mongoose.Types.ObjectId(req.params._id)
            }
        }, {
            $project: {
                job_id: 1,
                client_id: 1,
                totalcandidates: { $size: "$candidates" }

            }
        }, {
            $lookup: {
                from: "posts",
                as: "job_id",
                localField: "job_id",
                foreignField: "_id"
            }
        },
        { "$unwind": "$job_id" },
        {
            $lookup: {
                from: "users",
                as: "client_id",
                localField: "client_id",
                foreignField: "_id"
            }
        }, { "$unwind": "$client_id" }
        ];

        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500
                })
            }
            else if (result.length == 0) {
                res.send({
                    responseMessage: "No data found",
                    responseCode: 204


                })

            }
            else {
                res.send({
                    responseMessage: "find All jobs",
                    responseCode: 200,
                    result: result
                })

            }

        })

    },
    pishortlisted_user: function (req, res) {
		var query = [
			{
				$unwind: "$candidates"
			},
			{
				//               $match :{$and:[{'candidates.cv' : {$ne: null}},{'candidates.status' : "active"}]}
				$match: {
					'candidates.cv': {
						$ne: null
					}
				}
			},
			{
				$lookup: {
					from: "posts",
					as: "job_id",
					localField: "job_id",
					foreignField: "_id"
				}
			},
			{
				$lookup: {
					from: "users",
					as: "recruiter",
					localField: "recruiter_id",
					foreignField: "_id"
				}
			},
			{
				$lookup: {
					from: "users",
					as: "client",
					localField: "client_id",
					foreignField: "_id"
				}
			},
			{
				$unwind: "$job_id"
			},
			{
				$unwind: "$client_id"
			},
			{
				$unwind: "$recruiter_id"
			},
			{
				$project: {
					candidates: 1,
					"job_id.job_title": 1,
					"job_id.industry": 1,
					"job_id.Location": 1,
					"job_id.experience": 1,
					"job_id.status": 1,
					"job_id._id": 1,
					"client._id": 1,
					"client.user_id": 1,
					"client.user_name": 1,
					"recruiter._id": 1,
					"recruiter.user_id": 1,
					"recruiter.user_name": 1,
					"_id": 1
				}
			}

		]

		Usercandidate.aggregate(query).exec(function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500

				})

			} else if (result.length == 0) {
				res.send({
					responseMessage: "No result",
					responseCode: 400

				})

			} else {
				res.send({
					responseMessage: "All cv found",
					responseCode: 200,
					result: result
				})

			}
		})



	},
  
    readXlsxFileCandidates:function(req,res)
        {
            console.log("candidateBulkUpload > req.params----", req.params);
                    xmlCsvParser.parse(req.body.filePath)
                        .then(function (objS) {
                            console.log("1st object", objS)
                            res.send(objS)
                        });
            },
    candidateBulkUpload: function (req, res) {
        console.log("candidateBulkUpload > req.params----", req.params);
        async.waterfall([
            function (cb) {
                Userpost.findOne({ _id: mongoose.Types.ObjectId(req.params.job_id) }, function (err, result) {
                    cb(null, result.user_id)
                })
            },
            function (client_id, cb) {
                // xmlCsvParser.parse("temp/list.xlsx")
                xmlCsvParser.parse(req.body.filePath)
                    .then(function (objS) {
                        console.log("1st object", objS)
                        cb(null, client_id, objS["Sheet1"])
                    }, function (objE) {
                        console.log("object after sheet uploaded",objE)
                        cb(objE, null)
                    });
            },
            function (client_id, xclData, cb) {
                console.log('xclData: ', xclData);
                var cData = { _id: '', candidates: new Array() };
                console.log(cData);
                async.map(xclData, function (x, cbMap) {
                    // if(x["AREA_OF_SPECIALIZATION"] !=null || x["AREA_OF_SPECIALIZATION"] != undefined || x["AREA_OF_SPECIALIZATION"] != ''){
                        let obj = {
                            name: x["NAME"],
                            email: x["EMAIL"],
                            age: x["AGE"],
                            sex: x["SEX"],
                            experience: x["EXPERIENCE"],
                            phone_number: x["PHONE_NUMBER"],
                            qualification: x["QUALIFICATION"],
                            ctc: x["CTC"],
                            current_organisation: x["CURRENT_ORGANISATION"],
                            current_location: x["current_location"],
                            countrycode: x["countrycode"],
                            current_country: x["current_country"],
                            POSITION: x["POSITION"],
                            AREA_OF_SPECIALIZATION:x["AREA_OF_SPECIALIZATION"],
                            DATE_OF_SUBMIT: x["DATE_OF_SUBMIT"],
                        posted_on:req.body.candidate.posted_on,
                            background_check:   false,
                            withdraw: false,
                            status: "active"
                        };
                    // }
                 

                    Usercandidate.find({ job_id: mongoose.Types.ObjectId(req.params.job_id), recruiter_id: mongoose.Types.ObjectId(req.params._id) }, function (err, result) {
                        console.log('candidate result: ', cData);
                        console.log("result",result);

                        if (err) {
                            console.log('candidateBulkUpload > Usercandidate > err: ', err);
                        }
                        else if (result.length == 0) {
                            console.log("1");
                            var obj1 = {
                                job_id: req.params.job_id,
                                recruiter_id: req.params._id,
                                client_id: client_id
                            };

                            Usercandidate.findOneAndUpdate(obj1, { $push: { candidates: obj } }, { upsert: true, multi: true, new: true }).exec(function (err, result) {
                                err ? cbMap(err, null) : cbMap(null, result);
                            });
                        }
                        else {
                            cData._id = result[0]._id;

                            console.log("else 2");
                            // check duplicate record
                            Usercandidate.countDocuments({ "candidates.email": obj.email, "candidates.phone_number": obj.phone_number, "candidates.cv": { $ne: null } }, (errCount, count) => {
                                if (errCount)
                                    cbMap(errCount, null);

                                if (count > 0) {            // if duplicate candidate
                                    obj.is_candidate_duplicate = true;
                                    cData.candidates.push(obj);
                                    cbMap(null, cData);
                                } else {
                                    obj.is_candidate_duplicate = false;

                                    Usercandidate.findOneAndUpdate({ $and: [{ job_id: mongoose.Types.ObjectId(req.params.job_id) }, { recruiter_id: mongoose.Types.ObjectId(req.params._id) }] }, { $push: { candidates: obj } }, { upsert: true, multi: true, new: true }).exec(function (err, newResult) {
                                        if (err) cbMap(err, null)
                                        const c = newResult.candidates.filter(d => d.name === obj.name);
                                        obj._id = c[0]._id;
                                        obj.cv = null;
                                        cData.candidates.push(obj);
                                        cbMap(null, cData);
                                        // err ? cbMap(err, null) : cbMap(null, cData);
                                    });
                                }
                            });
                        }
                    })
                }, function (err, result) {
                    err ? cb(err) : cb(null, result)
                })
            }], function (err, result) {
                console.log('final cb:', result);
                delete result[1];
                err ? res.status(500).send(err) : res.send(result);
                // Usercandidate.find({ job_id: mongoose.Types.ObjectId(req.params.job_id), recruiter_id: mongoose.Types.ObjectId(req.params._id) }, function (err, finalresult) {
                //     err ? res.status(500).send(err) : res.send(finalresult);

                // });

            })
    },

    getSkillSuggestion: function (req, res) {
        console.log("suggestion start---------->")
        async.waterfall([
            function (cb) {
                //   Userpost.native(function(err,collection){
                var query = [{

                    $unwind: "skills"
                }];
                if (req.params.text != -1) {
                    query = [{
                        $match: {
                            skills: {
                                $regex: req.params.text.toLowerCase() + ".*",
                                $options: "i"
                            }
                        }
                    }];
                }

                query.push({
                    $group: {
                        _id: "$skills",
                        count: { $sum: 1 }
                    }
                }, {
                        $sort: {
                            count: -1
                        }
                    })

                console.log("get skill query 2------------>", JSON.stringify(query));
                Userpost.aggregate(query)
                    .exec(function (err, result) {
                        err ? cb(err) : cb(null, result);
                    })
                // })
            }], function (err, result) {
                console.log("get skill query 2------------>", JSON.stringify(result));

                var tags = [];
                //        for(var i=0;i<result.length;i++){
                //          console.log("result[i]---->",result[i])
                //          if(typeof(result[i]._id)=="string"){
                //            var indx=tags.findIndex(x=>x._id.toLowerCase()==result[i]._id.toLowerCase());
                //              console.log(indx)
                //            if(indx==-1){
                //              tags.push(result[i])
                //            }
                //            else{
                //              tags[indx].count+=result[i].count;
                //            }
                //          }
                //
                //        }


                err ? res.status(500).send(err) : res.send(result[0]);
            })

        //res.send(contacts.filter(x=>x.name.toLowerCase().indexOf(req.params.text.toLowerCase())>-1));
    },
    delete_post: function (req, res) {
        Userpost.findByIdAndRemove(req.params._id)
        .then(post => {
            if(!post) {
                return res.status(404).send({
                    message: "Job not found with id " + req.params._id
                });
            }
            res.send({message: "Job deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "job not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete job with id " + req.params.noteId
            });
        });
    },
    save_industry: function (req, res) {
        console.log("req----", req.body)
        var save_industry = new industry(req.body)
        save_industry.save(function (err, result) {
            err ? res.status(500).send(err) : res.send(result);
        })

    },

    save_functionalArea: function (req, res) {
        console.log("req----", req.body)
        var save_function = new functionArea(req.body)
        save_function.save(function (err, result) {
            err ? res.status(500).send(err) : res.send(result);
        })
    },

    get_function_list: function (req, res) {
        // functionArea.find({}, '_id value', function (err, result) {
        functionArea.find({}, '_id value').sort({ 'value': 1 }).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                res.send({ responseMessage: "Success", responseCode: 200, result: result });
            }
        })
    },

    get_industry_list: function (req, res) {
        industry.find({}, '_id value').sort({ 'value': 1 }).exec(function (err, result) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500
                })

            }
            else {
                res.send({
                    responseMessage: "Success",
                    responseCode: 200,
                    result: result
                })

            }



        })

    },


    bookmark_post: function (req, res) {
        console.log("req", req.body)
        waterfall([
            function (cb) {
                User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, { $addToSet: { bookmarks: req.body.job_id } }, { new: true }, function (err, result) {
                    if (err) {
                        cb(err)
                    }
                    else {
                        cb(null, result)
                    }

                })
            }, function (result, cb) {
                Userpost.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.job_id) }, { $addToSet: { bookmarks: req.body._id } }, { new: true }, function (err, finalresult) {
                    if (err) {
                        cb(err)
                    }
                    else {
                        cb(null, finalresult)
                    }
                })
            }

        ], function (err, sucess) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500

                })
            }
            else {
                res.send({
                    responseMessage: "done as bookmark",
                    responseCode: 200

                })
            }
        })



    },

    recruiter_bookmark_job_list: function (req, res) {
        console.log("enter")
        User.find({ _id: mongoose.Types.ObjectId(req.params._id) }, { bookmarks: 1 }).populate('bookmarks').exec(function (err, result) {
            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500

                })
            }
            else if (result.length == 0) {
                res.send({
                    responseMessage: "No bookmark post",
                    responseCode: 204,
                    result: result

                })

            }
            else {
                res.send({
                    responseMessage: "Find bookmark List",
                    responseCode: 200,
                    result: result

                })
            }

        })

    },

    client_dasboard_count: function (req, res) {
        async.parallel({
            TotalPost: function (callback) {
                Userpost.count({ user_id: mongoose.Types.ObjectId(req.params._id), draft_status: false }, function (err, result) {
                    callback(null, result);
                })

            },
            InterviewToday: function (callback) {
                //   	var d1 = new Date("2018-11-23T08:51:26.000Z")
                //    var d2 = new Date(d1);
                // var same = d1.getTime() === d2.getTime()
                var count = 0
                interview.find({ client_id: mongoose.Types.ObjectId(req.params._id) }, function (err, result) {
                    if (result.length == 0) {
                        callback(null, 0);
                    }
                    else {
                        for (var i = 0; i < result.length; i++) {
                            var d1 = new Date(result[i].interview_date)
                            var d2 = new Date(d1);
                            if (d1.getTime() === d2.getTime()) {
                                count++
                            }

                        }
                        callback(null, count);
                    }
                })

                // callback(null, 0);

            },
            Jobclosing: function (callback) {
                callback(null, 0)
            },
            ey_qualifiedResume: function (callback) {
                var query = [
                    {
                        $match: { "client_id": mongoose.Types.ObjectId(req.params._id) }
                    }, {
                        $unwind: "$candidates"
                    }, {
                        $match: { "candidates.ey_shortlist": true }
                    }, {
                        $group: {
                            _id: null,
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ]
                Usercandidate.aggregate(query).exec(function (err, result) {
                    if (result.length > 0) {
                        callback(null, result)

                    }
                    else {
                        var result = []
                        var a = {
                            "_id": null,
                            "count": 0
                        }
                        result.push(a)
                        callback(null, result)
                    }
                })

            }



        }, function (err, results) {
            console.log("results", results)

            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500


                })
            }
            else {
                res.send({
                    responseMessage: "Find All counts",
                    responseCode: 200,
                    result: results

                })

            }
            //      err?res.status(500).send(err):res.send({result:results})
            // results now equals to: [one: 'abc\n', two: 'xyz\n']
        });

    },

    //  totalcandidates: { $size: "$candidates" }

    recruiter_dasboard_count: function (req, res) {
        async.parallel({
            TotalcanidateUpload: function (callback) {
                // Usercandidate.count({recruiter_id_id:mongoose.Types.ObjectId(req.params._id)},function(err,result){
                //      callback(null, 0);
                // })
                var query = [
                    { $match: { "recruiter_id": mongoose.Types.ObjectId(req.params._id) } },
                    {
                        $project: {

                            totalcandidates: { $size: "$candidates" }
                        }
                    }

                ]

                Usercandidate.aggregate(query).exec(function (err, result) {
                    console.log("result-----", result)
                    if (result.length > 0) {
                        var k = result.reduce(function (acc, obj) {
                            return acc + obj.totalcandidates
                        }, 0)
                        console.log("kkkkk", k)
                        // callback(null,k.totalcandidates)
                        callback(null, k)
                    }
                    else {
                        callback(null, 0)
                    }
                })

            },
            Eyqualified: function (callback) {

                // callback(null, 0);

                var query = [
                    {
                        $match: { "recruiter_id": mongoose.Types.ObjectId(req.params._id) }
                    }, {
                        $unwind: "$candidates"
                    }, {
                        $match: { "candidates.ey_shortlist": true }
                    }, {
                        $group: {
                            _id: null,
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ]
                Usercandidate.aggregate(query).exec(function (err, result) {
                    if (result.length > 0) {
                        callback(null, result)

                    }
                    else {
                        var result = []
                        var a = {
                            "_id": null,
                            "count": 0
                        }
                        result.push(a)
                        callback(null, result)
                    }
                })

            },
            Totalshortlist: function (callback) {
                var query = [
                    {
                        $match: { "recruiter_id": mongoose.Types.ObjectId(req.params._id) }
                    }, {
                        $unwind: "$candidates"
                    }, {
                        $match: { "candidates.status": "0" }
                    }, {
                        $group: {
                            _id: null,
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ]
                Usercandidate.aggregate(query).exec(function (err, result) {
                    if (result.length > 0) {
                        callback(null, result)

                    }
                    else {
                        var result = []
                        var a = {
                            "_id": null,
                            "count": 0
                        }
                        result.push(a)
                        callback(null, result)
                    }
                })

            },
            TotalPlaced: function (callback) {
                var query = [
                    {
                        $match: { "recruiter_id": mongoose.Types.ObjectId(req.params._id) }
                    }, {
                        $unwind: "$candidates"
                    }, {
                        $match: { "candidates.status": "4" }
                    }, {
                        $group: {
                            _id: null,
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ]
                Usercandidate.aggregate(query).exec(function (err, result) {
                    if (result.length > 0) {
                        callback(null, result)

                    }
                    else {
                        var result = []
                        var a = {
                            "_id": null,
                            "count": 0
                        }
                        result.push(a)
                        callback(null, result)
                    }

                })
            }


        }, function (err, results) {
            console.log("results", results)

            if (err) {
                res.send({
                    responseMessage: "server err",
                    responseCode: 500


                })
            }
            else {
                res.send({
                    responseMessage: "Find All counts",
                    responseCode: 200,
                    result: results

                })

            }
            //      err?res.status(500).send(err):res.send({result:results})
            // results now equals to: [one: 'abc\n', two: 'xyz\n']
        });

    },
	candidate_status_undo: function (req, res) {
		// req.body.recruiterEmailId  req.body.candidateEmailId  req.body.job_title req.body.candidate_id

		Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) }, { $set: { 'candidates.$.status': 'active' } }, function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500
				})
			}
			else {
		
				res.send({
					responseMessage: "cv undo suceesfully",
					responseCode: 200
				})
			}
		})
	},
    client_shortlist_candidate: function (req, res) {
        console.log("req.body", req.body)
        candidateName ="";
        var query = [
            {
                $match: { $and: [{ job_id: mongoose.Types.ObjectId(req.body.job_id) }, { client_id: mongoose.Types.ObjectId(req.body._id) }] }
            }, {
                $unwind: "$candidates"
            }, {
                $match: { 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) }
            }
        ]
        waterfall([
            function (cb) {
                Usercandidate.aggregate(query).exec(function (err, result) {
                    console.log("result----", result[0].candidates)
                    candidateName = result[0].candidates.name;
                    cb(null, result)
                })
            },
            function (result, cb) {
                Usercandidate.findOneAndUpdate({ job_id: mongoose.Types.ObjectId(req.body.job_id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) }, { $set: { 'candidates.$.status': req.body.status } }, function (err, finalresult) {
                    cb(null, finalresult)
                })
            }
        ], function (err, result) {
            console.log("After Shortlist :",result);


            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
                User.findOne({_id: result.recruiter_id }).exec(async function (err, resultR) {
                    console.log("Recruter Details:",resultR);
                    var sendmailId;
                    var sendmailName;
                    var recruiter = resultR;
                 if(recruiter.postPerson_email== null || recruiter.postPerson_email == undefined){
                    sendmailId= recruiter.email_id
                    sendmailName =  recruiter.user_name

                 }else{
                    sendmailId =  recruiter.postPerson_email
                    sendmailName =  recruiter.postPerson_name
                 }
                 
                // await Usercandidate.findOne({_id: req.body.candidate_id}).exec(async function (err, resultC) {
                //     console.log("candidate data:",resultC);
                //     let  candidate = resultC;
                await User.findOne({_id: result.client_id }).exec(async function (err, results) {
                    console.log("client Details:",result);
                     let  client = results;
                await   Userpost.findOne({_id:result.job_id}).exec(async function (err, resultS) {
                    let job = resultS
                    console.log(candidateName);
               var htmlContent = spark.ShortListedYourCandidate( candidateName , sendmailName, recruiter.user_id ,client.user_id, client.user_name,  job.job_title);

                  await spark.send('noreply@peopleinfinia.com', sendmailId , 'Candidated Shortlisted ', htmlContent, "").then(function (result1) {
                       console.log('save_time_slot_job: Mail successfully sent.');
                   }).catch(err => {
                       console.log('save_time_slot_job: Unable to send mail', err);
                   });
                  });
                });
               });
            // });
                res.send({ responseMessage: "status updated", responseCode: 200 })

            }
        })
    },
    replaceResume: async function(req,res){
        console.log(req.body)
            let pdf_base64 = req.body.cv;
            let binaryData = new Buffer(pdf_base64, 'base64');
            let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
            let resumeFileName = `SampleCV_${randomNumber}`;
            let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;
        await fs.writeFile(resumeFileNameWithPath, binaryData, "binary",async function (err) {
                console.log('err: ', err);
           await cloudinary.uploader.upload  (resumeFileNameWithPath, async function (result) {
              await console.log("result------>> " + JSON.stringify(result));
                  req.body.cv = result.url;
               await     fs.unlinkSync(resumeFileNameWithPath);
                }, { public_id: resumeFileName });
              await  Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) }, { $set: { 'candidates.$.cv': req.body.cv } }, {new: true}, function (err, finalresult) {
                    if(err){
                           console.log(err);
                     }
                     else{
                     res.send({ responseMessage: "resume uploaded", responseCode: 200, result: finalresult });
                      }

                      })

            });
            },
    getJobStatus: async function(req,res){
        Usercandidate.find({job_id: mongoose.Types.ObjectId(req.params._id)}, function(err,result){
            if(err){
                res.send({ responseMessage: "server err", responseCode: 500 })
            }else{
                if(result.length === 0 ){
                    res.send({ responseMessage: "Not Activated", responseCode: 200, result: result });
                }
                if(result.length > 0 ){
                    res.send({ responseMessage: "Active", responseCode: 200, result: result });
                }
                // console.log("jobfound",result);
            }
        })
    },
    getUrlOfCandidateCv: async function(req,res){
        // console.log("Excel",req.body);
       
                var pdf_base64 = req.body.cv;
                var binaryData = new Buffer(pdf_base64, 'base64');

                let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                let resumeFileName = `resume_${randomNumber}`;
                let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;
                if(req.body.Institute ==true){
                    clientId =   req.body.job_id
                }else{
                    await Userpost.findOne({ _id: mongoose.Types.ObjectId(req.body.job_id) }, function (err, result) {
                        clientId =  result.user_id
                     })
                }
            
                await   fs.writeFile(resumeFileNameWithPath, binaryData, "binary", async function (err) {
                    console.log('err: ', err);

                await   cloudinary.uploader.upload(resumeFileNameWithPath, async  function (result) {
                 await console.log("result------>> " + JSON.stringify(result));
                   req.body.cv = result.url;
                   await  fs.unlinkSync(resumeFileNameWithPath);
                    await Usercandidate.find({ job_id: mongoose.Types.ObjectId(req.body.job_id), recruiter_id: mongoose.Types.ObjectId(req.body.recruiter_id) }).exec( async function (err,result) {
                    // console.log("result",result);
                  let dataOfArea=  req.body.candidate
                    // if(dataOfAreaAREA_OF_SPECIALIZATION !=null ||dataOfArea.AREA_OF_SPECIALIZATION != undefined || dataOfArea.AREA_OF_SPECIALIZATION!= ''){

                    let obj = {
                        name: req.body.candidate.name,
                        email: req.body.candidate.email,
                        age: req.body.candidate.age,
                        sex: req.body.candidate.sex,
                        experience: req.body.candidate.experience,
                        phone_number: req.body.candidate.phone_number,
                        cv : req.body.cv,
                        qualification: req.body.candidate.qualification,
                        ctc: req.body.candidate.ctc,
                        current_organisation: req.body.candidate.current_organisation,
                        current_location: req.body.candidate.current_location,
                        countrycode: req.body.candidate.countrycode,
                        current_country: req.body.candidate.current_country,
                        AREA_OF_SPECIALIZATION: req.body.candidate.AREA_OF_SPECIALIZATION,
                        POSITION: req.body.candidate.POSITION,
                        posted_on:req.body.candidate.posted_on,
                        DATE_OF_SUBMIT:req.body.candidate.DATE_OF_SUBMIT,
                        uploaded_on:req.body.candidate.uploaded_on,
                        background_check: false,
                        withdraw: false,
                        status: "active"
                    };
                // }else{
                //     res.send({ responseMessage: "AREA_OF_SPECIALIZATION Require", responseCode: 400})
                // }
                          if(result.length == 0){
                            var obj1 = {
                                job_id: req.body.job_id,
                                recruiter_id: req.body.recruiter_id,
                                client_id: clientId
                            };
                            // console.log("udated excel",obj);
                         await   Usercandidate.findOneAndUpdate(obj1, { $push: { candidates: obj } }, { upsert: true, multi: true, new: true }).exec( async function (err, result) {
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                   await res.send({ responseMessage: "resume uploaded", responseCode: 200, result: result });
                                    }
                                });
                            }else{
                                Usercandidate.find({"job_id":req.body.job_id, "recruiter_id":req.body.recruiter_id,"candidates.email":req.body.candidate.email}).exec(function(err,result){
                                    if(err){
                                        console.log(err);
                                    }
                                    if(result){
                                     if(result.length === 0){
                                        Usercandidate.findOneAndUpdate({ $and: [{ job_id: mongoose.Types.ObjectId(req.body.job_id) }, { recruiter_id: mongoose.Types.ObjectId(req.body.recruiter_id) }] }, { $push: { candidates: obj } }, { upsert: true, multi: true, new: true }).exec(function (err, newResult) {
                                                                if(err){
                                                                    console.log(err);
                                                                }
                                                                else{
                                                                    console.log("pushing obj");
                                                                    // console.log("udated excel",obj);

                                                                    res.send({ responseMessage: "resume uploaded", responseCode: 200, result:  newResult });
                                                                 }
                                                             })
                                     }else{
                                        res.send({ responseMessage: "Candidate Already", responseCode: 200, result:  req.body.candidate });
                                     }

                                    }
                                })
                                //  console.log("candidates array ",result[0].candidates)
                                // for(let i = 0; i < result[0].candidates.length ; i++){
                                //     if( result[0].candidates[i].email === req.body.candidate.email ){
                                //         console.log("email match");
                                //        await   res.send({ responseMessage: "Candidate Already Exist", responseCode: 200, result:  req.body.candidate });
                                //         }else{
                                //             console.log("didnt match");
                                //              if(result[0].candidates[i].email !== req.body.candidate.email && i === result[0].candidates.length-1){
                                //                  console.log("last element", i)
                                //                 Usercandidate.findOneAndUpdate({ $and: [{ job_id: mongoose.Types.ObjectId(req.body.job_id) }, { recruiter_id: mongoose.Types.ObjectId(req.body.recruiter_id) }] }, { $push: { candidates: obj } }, { upsert: true, multi: true, new: true }).exec(function (err, newResult) {
                                //                     if(err){
                                //                         console.log(err);
                                //                     }
                                //                     else{
                                //                         console.log("pushing obj");

                                //                         res.send({ responseMessage: "resume uploaded", responseCode: 200, result:  newResult });
                                //                      }
                                //                  })
                                //             }
                                //         }
                                //     }
                                }

                            })
                         });
                    });
                },

                    // if (err) {
                    //     console.log('candidateBulkUpload > Usercandidate > err: ', err);
                    // }
                    // else if (result.length == 0) {
                    //     console.log("1");
                    //     var obj1 = {
                    //         job_id: req.params.job_id,
                    //         recruiter_id: req.params._id,
                    //         client_id: client_id
                    //     };

                    //     Usercandidate.findOneAndUpdate(obj1, { $push : { candidates : obj }}, { upsert : true, multi : true, new : true }).exec(function (err, result) {
                    //         err ? cbMap(err, null) : cbMap(null, result);
                    //     });
                    // }
                    // else {
                    //     cData._id = result[0]._id ;

                    //     console.log("else 2");
                    //     // check duplicate record
                    //     Usercandidate.countDocuments({ "candidates.email": obj.email, "candidates.phone_number": obj.phone_number, "candidates.cv": { $ne: null } }, (errCount, count) => {
                    //         if (errCount)
                    //             cbMap(errCount, null);

                    //         if (count > 0) {            // if duplicate candidate
                    //             obj.is_candidate_duplicate = true;
                    //             cData.candidates.push(obj);
                    //             cbMap(null, cData);
                    //         } else {
                    //             obj.is_candidate_duplicate = false;

                    //             Usercandidate.findOneAndUpdate({ $and: [{ job_id: mongoose.Types.ObjectId(req.params.job_id) }, { recruiter_id: mongoose.Types.ObjectId(req.params._id) }] }, { $push: { candidates: obj } }, { upsert: true, multi: true, new: true }).exec(function (err, newResult) {
                    //                 if (err) cbMap(err, null)
                    //                 const c = newResult.candidates.filter(d => d.name === obj.name);
                    //                 obj._id = c[0]._id;
                    //                 obj.cv = null;
                    //                 cData.candidates.push(obj);
                    //                 cbMap(null, cData);
                    //                 // err ? cbMap(err, null) : cbMap(null, cData);
                    //             });
                    //         }
                    //     });
                    // }


    //         function (result, cb) {
    //             var query = [
    //                 {
    //                     $match: { _id: mongoose.Types.ObjectId(req.params._id) }
    //                 }, {
    //                     $unwind: "$candidates"
    //                 }, {
    //                     $match: { 'candidates._id': mongoose.Types.ObjectId(req.body.candidates_id) }
    //                 }
    //             ]
    //             Usercandidate.aggregate(query).exec(function (err, aggregateResult) {
    //                 cb(null, agg
    //  regateResult, result)
    //             })
    //         },
    //         function (aggregateResult, result, cb) {
    //             console.log("aggregateResult: ", aggregateResult)
    //             console.log("aggregateResult+result: ", result)
    //             Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidates_id) }, { $set: { 'candidates.$.cv': result } }, { new: true }, function (err, finalresult) {
    //                 console.log("finalresult: ", finalresult)
    //                 if (err) {
    //                     cb(err)
    //                 }
    //                 else {
    //                     cb(null, finalresult)
    //                 }
    //             })
    //         }
    //     ], function (err, result) {
    //         if (err) {
    //             res.send({ responseMessage: "server err", responseCode: 500 })
    //         }
    //         else {
    //             User.findOne({_id: result.recruiter_id }).exec(async function (err, resultR) {
    //                 console.log("Recruter Details:",resultR);
    //                 var recruiter = resultR;
    //                 await   Userpost.findOne({_id:result.job_id}).exec(async function (err, resultS) {
    //                     let job = resultS
    //                 var htmlContent = spark.ThankForUploadingCV(recruiter.user_name, recruiter.user_id,  job.job_title);

    //                 await spark.send('noreply@peopleinfinia.com', recruiter.email_id , 'CV Uploaded Shortlisted ', htmlContent, "").then(function (result1) {
    //                      console.log('save_time_slot_job: Mail successfully sent.');
    //                  }).catch(err => {
    //                      console.log('save_time_slot_job: Unable to send mail', err);
    //                  });
    //             });
    //         });
    //             res.send({ responseMessage: "resume updated", responseCode: 200, result: result });
    //         }
    //     })
    // },

    upload_candidates_resume: function (req, res) {   // use cloudinary base 64
        // console.log("req---", req.body)
        // console.log("req---", req.params)
        waterfall([
            function (cb) {
                var pdf_base64 = req.body.cv;
                var binaryData = new Buffer(pdf_base64, 'base64');

                let randomNumber = Math.random().toString().substr(2, 10);       // generate 10 digit random number
                let resumeFileName = `resume_${randomNumber}`;
                let resumeFileNameWithPath = `./public/${resumeFileName}.pdf`;

                fs.writeFile(resumeFileNameWithPath, binaryData, "binary", function (err) {
                    console.log('err: ', err);

                    cloudinary.uploader.upload(resumeFileNameWithPath, function (result) {
                        console.log("result------>> " + JSON.stringify(result));
                        req.body.cv = result.url;
                        cb(null, result.url);
                    }, { public_id: resumeFileName });
                });
            },

            function (result, cb) {
                var query = [
                    {
                        $match: { _id: mongoose.Types.ObjectId(req.params._id) }
                    }, {
                        $unwind: "$candidates"
                    }, {
                        $match: { 'candidates._id': mongoose.Types.ObjectId(req.body.candidates_id) }
                    }
                ]
                Usercandidate.aggregate(query).exec(function (err, aggregateResult) {
                    cb(null, aggregateResult, result)
                })
            },
            function (aggregateResult, result, cb) {
                console.log("aggregateResult: ", aggregateResult)
                console.log("aggregateResult+result: ", result)
                Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidates_id) }, { $set: { 'candidates.$.cv': result } }, { new: true }, function (err, finalresult) {
                    console.log("finalresult: ", finalresult)
                    if (err) {
                        cb(err)
                    }
                    else {
                        cb(null, finalresult)
                    }
                })
            }
        ], function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
            //     User.findOne({_id: result.recruiter_id }).exec(async function (err, resultR) {
            //         console.log("Recruter Details:",resultR);
            //         var recruiter = resultR;
            //         await   Userpost.findOne({_id:result.job_id}).exec(async function (err, resultS) {
            //             let job = resultS
            //         var htmlContent = spark.ThankForUploadingCV(recruiter.user_name, recruiter.user_id,  job.job_title);

            //         await spark.send('noreply@peopleinfinia.com', recruiter.email_id , 'CV Uploaded Shortlisted ', htmlContent, "").then(function (result1) {
            //              console.log('save_time_slot_job: Mail successfully sent.');
            //          }).catch(err => {
            //              console.log('save_time_slot_job: Unable to send mail', err);
            //          });
            //     });
            // });
                res.send({ responseMessage: "resume updated", responseCode: 200, result: result });
            }
        })
    },

    recruiter_manage_candidate: function (req, res) {
        // console.log("req---", req.params)
        var query = [
            {
                $match: {
                    recruiter_id: mongoose.Types.ObjectId(req.params._id)
                }
            }, {
                $unwind: "$candidates"
            }, {
                $match: { $or: [{ 'candidates.status': "0" }, { 'candidates.status': "1" }] }
            }, {
                $lookup:
                {
                    from: "posts",
                    as: "job_id",
                    localField: "job_id",
                    foreignField: "_id"
                }
            }, {
                $project: {
                    candidates: 1,
                    "job_id.job_title": 1,
                    "job_id.industry": 1,
                    "job_id.Location": 1,
                    "job_id.experience": 1,
                    "job_id.status": 1,
                    "job_id._id": 1,
                    "_id": 1
                }
            }
        ]

        Usercandidate.aggregate(query).exec(function (err, result) {
            // console.log("result---", result)
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })

            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No candidate found", responseCode: 204 })


            }
            else {
                res.send({ responseMessage: "All candidate found", responseCode: 200, result: result })

            }

        })



    },
    recruiter_manage_Reject_candidate: function (req, res) {
        // console.log("req---", req.params)
        var query = [
            {
                $match: {
                    recruiter_id: mongoose.Types.ObjectId(req.params._id)
                }
            }, {
                $unwind: "$candidates"
            }, {
                $match: { 'candidates.status': "5" } 
            }, {
                $lookup:
                {
                    from: "posts",
                    as: "job_id",
                    localField: "job_id",
                    foreignField: "_id"
                }
            }, {
                $project: {
                    candidates: 1,
                    "job_id.job_title": 1,
                    "job_id.industry": 1,
                    "job_id.Location": 1,
                    "job_id.experience": 1,
                    "job_id.status": 1,
                    "job_id._id": 1,
                    "_id": 1
                }
            }
        ]

        Usercandidate.aggregate(query).exec(function (err, result) {
            // console.log("result---", result)
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })

            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No candidate found", responseCode: 204 })


            }
            else {
                res.send({ responseMessage: "All candidate found", responseCode: 200, result: result })

            }

        })



    },
    withdraw_candidates: function (req, res) {
        // console.log("req", req.body)
        // var query = [
        //     { $match: { $and: [{ job_id: mongoose.Types.ObjectId(req.body.job_id) }, { recruiter_id: mongoose.Types.ObjectId(req.body._id) }] } },
        //     { $unwind: "$candidates" },
        //     { $match: { 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) } }
        // ]

        // Usercandidate.aggregate(query).exec(function (err, result) {
        //     if (err) {
        //         res.send({ responseMessage: "server err", responseCode: 500 })

        //     }
        //     else {
        //         Usercandidate.findOneAndUpdate({ job_id: mongoose.Types.ObjectId(req.body.job_id), 'candidates._id': req.body.candidate_id }, { $set: { 'candidates.$.withdraw': true } }, function (err, finalresult) {
        //             if (err) {
        //                 res.send({ responseMessage: "server err", responseCode: 500 })

        //             }
        //             else {
        //                 res.send({ responseMessage: "candidate withdraw sucessfully", responseCode: 200 })
        //             }
        //         })
        //     }

        // })
        console.log(req.body)
        // Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.job_id), 'candidates._id': req.body.candidates_id }, { $set: { 'candidates.$.withdraw': true } }, { new: true }, function (err, finalresult) {
        //     Usercandidate.find({"job_id":req.body.job_id, "recruiter_id":req.body._id,"candidates.email":req.body.candidate_id}).exec(function(err,result){
        // console.log("finalresult: ", result)
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         console.log(result);
        //     }
        // })
        Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.job_id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidates_id) }, { $set: { 'candidates.$.withdraw': true } }, function (err, finalresult) {
            console.log("finalresult: ", finalresult)
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 });
            }
            else {
                res.send({ responseMessage: "candidate withdraw sucessfully", responseCode: 200 });
            }
        })
        // Usercandidate.update(
        //     {job_id:mongoose.Types.ObjectId(req.body.job_id) , 'candidates.$._id':mongoose.Types.ObjectId(req.body.candidate_id)},
        //     {$set:{'candidates.$.withdraw': true }},
        //     function(err,result){
        //         console.log("result---",result);
        //         if (err) {
        //                             res.send({ responseMessage: "server err", responseCode: 500 })

        //                         }
        //                         else {

        //                             res.send({ responseMessage: "candidate withdraw sucessfully", responseCode: 200 })
        //                         }
        //     })
    },

    client_dashboard_feed: function (req, res) {
        var query =
            [
                {
                    $match: { client_id: mongoose.Types.ObjectId(req.params._id) }
                },
                {
                    $unwind: "$candidates"
                },
                {
                    $match: { $and: [{ 'candidates.cv': { $ne: null } }, { 'candidates.status': "active" }] }

                },
                {
                    $group: {
                        _id: "$job_id",
                        proposal: { $sum: 1 }
                    }
                },
              {
                    $lookup: {
                        from: "posts",
                        as: "job_id",
                        localField: "_id",
                        foreignField: "_id"
                    }
                },
                {
                    $unwind: "$job_id"
                },
             
                {
                    $project: {
                        proposals:1,
                        proposal: 1,
                        "job_id.job_title": 1
                    }
                }

            ]

        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })

            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No proposal found", responseCode: 204 })

            }
            else {
                res.send({ responseMessage: "proposal find", responseCode: 200, result: result })

            }

        })


    },

    client_view_resume: function (req, res) {
        var query = [
            { $match: { $and: [{ client_id: mongoose.Types.ObjectId(req.params._id) }, { job_id: mongoose.Types.ObjectId(req.params.job_id) }] } },
            { $unwind: "$candidates" },
            {
                $lookup: {
                    from: "users",
                    as: "recruiters",
                    localField: "recruiter_id",
                    foreignField: "_id"
                }
            },
            {
                $unwind: "$recruiters"
            },
            {
                // $match :{'candidates.cv' : {$ne: null}}
                $match: { $and: [{ 'candidates.cv': { $ne: null } }, { 'candidates.status': "active" }] }

            }
        ]

        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
                res.send({ responseMessage: "proposal find", responseCode: 200, result: result })

            }
        })



    },

    client_candidate_list: function (req, res) {
        console.log("req----", req.params)
        var query = [
            {
                $match: {
                    client_id: mongoose.Types.ObjectId(req.params._id)
                }
            }, {
                $unwind: "$candidates"
            }, {
                $match: { 'candidates.withdraw': { $ne: true } }
            },
            {
                $match: { $or: [{ 'candidates.status': "0" }, { 'candidates.status': "1" }, { 'candidates.status': "2" }, { 'candidates.status': "4" }] }
            }, {
                $lookup: {
                    from: "posts",
                    as: "job_id",
                    localField: "job_id",
                    foreignField: "_id"
                }
            }, {
                $lookup: {
                    from: "users",
                    as: "recruiter_id",
                    localField: "recruiter_id",
                    foreignField: "_id"
                }
            }, {
                $unwind: "$job_id"
            },
            {
                $unwind: "$recruiter_id"
            },
            {
                $project: {
                    'recruiter_id._id': 1,
                    'recruiter_id.user_id': 1,
                    'recruiter_id.user_name': 1,
                    'job_id._id': 1,
                    'job_id.job_title': 1,
                    candidates: 1
                }
            }
        ]
        console.log(query);
        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else if (result.length == 0) {
                res.send({ responseMessage: "no data found", responseCode: 204 })
            }
            else {
                res.send({ responseMessage: "find all data", responseCode: 200, result: result })
            }
        })
    },

    fetch_data: function (req, res) {
        console.log("req---", req.params)
        var query = [{
            $match: { $and: [{ job_id: mongoose.Types.ObjectId(req.params.job_id) }, { client_id: mongoose.Types.ObjectId(req.params._id) }] }
        },
        {
            $unwind: "$candidates"
        }, {
            $match: { 'candidates._id': mongoose.Types.ObjectId(req.params.candidate_id) }
        },
        {
            $lookup: {
                from: "posts",
                as: "job_id",
                localField: "job_id",
                foreignField: "_id"
            }
        }
        ]
        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
                res.send({ responseMessage: "dataFound", responseCode: 200, result: result })

            }

        })

    },

    view_job_status_recruiter: function (req, res) {  // pending
        console.log("req---", req.params)
        var query = [
            {
                $match: { $and: [{ job_id: mongoose.Types.ObjectId(req.params.job_id) }, { recruiter_id: mongoose.Types.ObjectId(req.params._id) }] }
            },
            {
                $lookup: {
                    from: "posts",
                    as: "job_id",
                    localField: "job_id",
                    foreignField: "_id"
                }
            }, {
                $project: {
                    'job_id.job_title': 1,
                    'job_id._id': 1,
                    'job_id.deadline': 1,
                    'job_id.vacancy': 1,
                    candidates: 1
                }

            }

        ]

        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No data found", responseCode: 204 })
            }
            else {
                res.send({ responseMessage: "All list found", responseCode: 200, result: result })
            }

        })


    },

    view_client_job_response: function (req, res) {
        console.log("req-----", req.params)
        var query = [

            {
                $match: { $and: [{ job_id: mongoose.Types.ObjectId(req.params.job_id) }, { client_id: mongoose.Types.ObjectId(req.params._id) }] }
            }, {
                $lookup: {
                    from: "posts",
                    as: "job_id",
                    localField: "job_id",
                    foreignField: "_id"
                }
            },
            {
                $project: {
                    'job_id.job_title': 1,
                    'job_id.job_title': 1,
                    'job_id._id': 1,
                    'job_id.deadline': 1,
                    'job_id.vacancy': 1,
                    candidates: 1,
                    totalcandidates: { $size: "$candidates" }
                }

            }
        ]
        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No data found", responseCode: 204 })
            }
            else {
                res.send({ responseMessage: "all candidates found", responseCode: 200, result: result })
            }

        })


    },

    recruiter_company_calender_list: function (req, res) {
        console.log("req---", req.params)
        var query = [
            {
                $match: {
                    recruiter_id: mongoose.Types.ObjectId(req.params._id)
                }

            },
            {
                $lookup: {
                    from: "posts",
                    as: "job_id",
                    localField: "job_id",
                    foreignField: "_id"

                }
            }, {
                $unwind: "$job_id"
            },

            {
                $project: {
                    'job_id.company_name': 1,
                    'job_id._id': 1
                }
            }

        ]

        // Usercandidate.find({
        // recruiter_id : mongoose.Types.ObjectId(req.params._id)}).populate({ path: 'job_id', select: 'company_name'}).exec(function(err,result){
        // 	console.log("errrr",err)
        Usercandidate.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })

            }
            else if (result.length == 0) {
                res.send({ responseMessage: "No company list", responseCode: 204 })

            }
            else {
                res.send({ responseMessage: "All company list", responseCode: 200, result: result })
            }


        })


    },

    showjob: function (req, res) {
        console.log("req.params")
        Userpost.findOne({ _id: mongoose.Types.ObjectId(req.params._id) }, function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
                res.send({ responseMessage: "company detail", responseCode: 200, result: result })
            }

        })

    }
    ,

    newGetSkillsuggestion: function (req, res) {

        var query = [{
            $unwind: "$skills"
        },
        { $group: { _id: '$skills' } }
        ]
        Userpost.aggregate(query).exec(function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })


            }
            else if (result.length == 0) {
                res.send({ responseMessage: "no skill ", responseCode: 204 })

            }
            else {
                var count = 1
                var result = result.map(function (el) {
                    var o = Object.assign({}, el);
                    o.item_id = count++;
                    return o;
                })
                res.send({ responseMessage: "skill found", responseCode: 200, result: result })
            }

        })
    },

    client_get_job_detail: function (req, res) {
        Userpost.findOne({ user_id: mongoose.Types.ObjectId(req.params._id), _id: mongoose.Types.ObjectId(req.params.job_id) }, function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
                res.send({ responseMessage: "data found", responseCode: 200, result: result })
            }

        })


    },

    get_job_Id_detail: function (req, res) {
        Userpost.findOne({_id: mongoose.Types.ObjectId(req.params._id) }, function (err, result) {
            if (err) {
                res.send({ responseMessage: "server err", responseCode: 500 })
            }
            else {
                res.send({ responseMessage: "data found", responseCode: 200, result: result })
            }

        })


    },



}

module.exports = user_post


var get_count = function (callback) {
    waterfall([
        (cb) => {
            postcount.findOne({}, function (err, success_data) {
                console.log("success_data", success_data)
                if (err) cb(err, null);
                else cb(null, success_data);
            })
        },
        (success_data, cb) => {
            var v = success_data.postcount + 1
            console.log("v-----", v)
            // postcount.findByIdAndUpdate({_id:mongoose.Types.ObjectId(success_data._id)},{
            //   $inc:postcount
            // },{ projection: postcount , new :true},function(err,updated_count){
            // 		console.log("updated_count",updated_count)
            //   if(err) cb(err,null);
            //   else cb(null,updated_count);
            // })
            postcount.findOneAndUpdate({ _id: mongoose.Types.ObjectId(success_data._id) }, { $set: { "postcount": success_data.postcount + 1 } }, { new: true }, { postcount: 1 }, function (err, updated_count) {
                console.log("updated_count", updated_count)
                if (err) cb(err, null);
                else cb(null, updated_count);
            })
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(null, result);
        }
    })
}
