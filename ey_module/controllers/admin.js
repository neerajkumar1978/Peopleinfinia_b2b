var User = require('../mongo_handler/user.js')
var Userpost = require('../mongo_handler/post.js')
var postcount = require('../mongo_handler/postcount.js')
var Usercandidate = require('../mongo_handler/candidate.js')
var interview = require('../mongo_handler/interview.js');

var mongoose = require("mongoose")
var waterfall = require('async-waterfall');
var cloudinary = require('cloudinary');
var async = require("async");
var jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
var config = require('../global_vars/config');
const { Issue, validateIssue } = require('../mongo_handler/issues');
const { UserIssue, validateUserIssue } = require('../mongo_handler/userIssues');
const spark = require('../global_vars/sparkpost.js');

cloudinary.config({
	cloud_name: 'dpijyjulg',
	api_key: '344142488787362',
	api_secret: 'E6textvz7MZkvU4H-zw4L2Ybxmw'
  });

function validate(req) {
	const schema = {
		email_id: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(req, schema);
}

var admin_user = {
	ping: function (req, res) {
		res.status(200).send('OK');
	},

	admin_login: async function (req, res) {
		/* User.findOne({
			email_id: req.body.email_id,
			password: req.body.password,
			user_type: "superAdmin"
		}, {
				user_type: 1,
				user_name: 1,
				email_id: 1
			}, function (err, result) {
				if (err) {
					res.send({ responseMessage: "server err", responseCode: 500 });
				} else if (!result) {
					res.send({ responseMessage: "Email or password is invalid.", responseCode: 204 });
				} else {
					const token = jwt.sign(
						{ _id: result._id, user_id: 'admin', email_id: result.email_id },
						config.authSecretKey,
						{ expiresIn: 60 * 60 * 24 }			// 24 hours
					);

					res.status(200).send({ responseCode: 200, responseMessage: 'Login successful', token });
				}
			}) */

		// validate email and password
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// find user by provided email id
		let user = await User.findOne({ email_id: req.body.email_id, user_type: 'superAdmin' });
		if (!user) return res.status(400).send('Invalid email or password.');
if(user){
	console.log("id",user._id)
}
		// if password doesn't match
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) return res.status(400).send('Invalid password.');

		// log user's login time
		await User.update({ _id: mongoose.Types.ObjectId(user._id) }, { $set: { last_login_at: Date.now() } });
		const token = jwt.sign(
			{ _id: user._id, user_id: 'admin', email_id: user.email_id },
			config.authSecretKey,
			{ expiresIn: 60 * 60 * 24 }			// 24 hours
		);

		res.status(200).send({ responseCode: 200, responseMessage: 'Login successful', token });
	},

	get_recruiter_jobs: function (req, res) {
		Usercandidate.distinct('job_id', { recruiter_id: req.params._id }, function (err, result) {
			if (err) {
				res.send({ responseMessage: "server err", responseCode: 500 })
			} else {
				res.send({ responseMessage: "Profile found", responseCode: 200, result: result })
			}
		})
	},

	get_profile: function (req, res) {
		User.findOne({ _id: req.params._id }, { password: 0 }, function (err, result) {
			if (err) {
				res.send({ responseMessage: "server err", responseCode: 500 })
			}
			else {
				res.send({ responseMessage: "Profile found", responseCode: 200, result: result })
			}
		})

	},
	get_Job_Id_profile: function (req, res) {
		Userpost.findOne({ _id: req.params._id }, function (err, result) {
			if (err) {
				res.send({ responseMessage: "server err", responseCode: 500 })
			}
			else {
				res.send({ responseMessage: "Profile found", responseCode: 200, result: result })
			}
		})

	},
	admin_full_job_list: function (req, res) {
		//        Userpost.find({}).sort({created_at:-1}).exec(function(err,result){
		//       if(err){
		//       	  res.send({
		//      responseMessage :"server err",
		//      responseCode :500
		//   })
		//
		//       }
		//       else if(result.length == 0){
		//		  res.send({
		//		      responseMessage :"No post found",
		//		      responseCode :400
		//		   })
		//
		//       }
		//       else{
		//	       	  res.send({
		//	      responseMessage :"All post found",
		//	      responseCode :200,
		//	      result :result
		//	   })
		//
		//       }
		//
		//        })
		var query = [
			//			    {
			//			     $match :{client_id :mongoose.Types.ObjectId(req.params._id)}
			//			        },
			{
				$unwind: "$candidates"
			},
			{
				            //   $match :{$and:[{'candidates.cv' : {$ne: null}},{'candidates.status' : "active"}]}
				//               $match :{$and:[{'candidates.cv' : {$ne: null}},{'candidates.status' : "active"}]}
				$match: {'candidates.cv': {	$ne: null}	}

			},
			{
				$group: {
					_id: "$job_id",
					proposal: {
						$sum: 1
					}
				}
			}, {
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
					proposal: 1,
					"job_id.job_title": 1,
					"job_id.company_name": 1,
					"job_id.deadline": 1,
					"job_id.ctc_max": 1,
					"job_id.status": 1,
					"job_id._id": 1,
					"job_id.created_at": 1,
					"job_id.doc":1,
					"job_id.company_id":1,
					"job_id.company_email":1,
				}
			}
		]

		Usercandidate.aggregate(query).exec(function (err, result) {
			if (err) {
				res.send({ responseMessage: "server err", responseCode: 500 })
			} else if (result.length == 0) {
				res.send({ responseMessage: "No post found", responseCode: 400 })
			} else {
				res.send({ responseMessage: "ALl data found", responseCode: 200, result: result })
			}
		})
	},

	block_user: function (req, res) { // pause  // delete
		User.findOneAndUpdate({ _id: req.params._id }, { $set: { is_block: req.body.is_block } }, { new: true }, function (err, result) {
			if (err) {
				res.send({ responseMessage: "server err", responseCode: 500 })
			}
			else {
				res.send({ responseMessage: "data change", responseCode: 200, result: result })
			}
		})
	},

	admin_manage_user: function (req, res) {
		User.find({
			$or: [
				{ user_type: "1" },
				{ user_type: "0" }]
		}, {
				password: 0
			}).sort({created_at:-1}).exec(function (err, result) {
				if (err) {
					res.send({
						responseMessage: "server err",
						responseCode: 500
					})

				} else if (result.length == 0) {
					res.send({
						responseMessage: "No post found",
						responseCode: 400
					})

				} else {
					res.send({ responseMessage: "all user found", responseCode: 200, result: result })
				}
			})
	},

	findGraphJobs:async function (req, res) {
		var dateT =[];
		var dateTVal =[];
		var dateTVal1 =[];
		 dateT =req.body
		//  let dateF = req.query.dateF
		for (let d = 0; d <6; d++) {
			const element = dateT[d];
	await Userpost.find({ created_at: {$lte: new Date(element.dateT),$gte: new Date(element.dateF)}, } ).count().exec( async function (err, result) {
		let lastFivess = element.dateT.split('/').pop();
		dateTVal.push({count:result,year:+(lastFivess)})
		if(dateTVal.length==6){
			await	res.send({
				responseMessage: "Find All Graph Jobs counts",
				responseCode: 200,
				result: dateTVal
			})
		 dateTVal=[]
		}
	})
		}
	},

	findGraphResumes:async function (req, res) {
		var dateT =[];
		var dateTVal =[];
		var dateTVal1 =[];
		 dateT =req.body
		//  await Usercandidate.find({ } ).count().exec( async function (err, result) {
		// 	console.log("@@ result count",result,)
	
		// })
		//  let dateF = req.query.dateF
		for (let d = 0; d <6; d++) {
			const element = dateT[d];

	await Usercandidate.find({ 'candidates.uploaded_on': {$lte: new Date(element.dateT),$gte: new Date(element.dateF)}, } ).count().exec( async function (err, result) {
		let lastFivess = element.dateT.split('/').pop();
		dateTVal.push({count:result,year:+(lastFivess)})
	//	console.log("dateTValdateTVal",result,dateTVal)
		if(dateTVal.length==6){
			await	res.send({
				responseMessage: "Find All Graph Usercandidate counts",
				responseCode: 200,
				result: dateTVal
			})
		 dateTVal=[]
		}
	})
		}
	},
	getCurrentYearDataMonthWise:async function (req, res) {
		console.log("getCurrentYearDataMonthWise @@ ",req.body,)
		let datadf=req.body.params
		const monthsArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

		User.aggregate( [
		  { 
			  $match: { 
				created_at: {$lte: new Date(datadf.dateT),$gte: new Date(datadf.dateF)}
			  }
		  },
		  { 
			  $group: {
				  _id: { "year_month": { $substrCP: [ "$created_at", 0, 7 ] } }, 
				  count: { $sum: 1 }
			  } 
		  },
		  {
			  $sort: { "_id.year_month": 1 }
		  },
		  { 
			  $project: { 
				  _id: 0, 
				  count: 1, 
				  month_year: { 
					//   $concat: [ 
					// 	 { $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
					// 	 "-", 
					// 	 { $substrCP: [ "$_id.year_month", 0, 4 ] }
					//   ] 
					  $concat: [ 
						{ $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
						
					 ] 
				  }
			  } 
		  },
		  { 
			  $group: { 
				  _id: null, 
				  data: { $push: { k: "$month_year", v: "$count" } }
			  } 
		  },
		  {
			  $project: { 
				  data: { $arrayToObject: "$data" }, 
				  _id: 0 
			  } 
		  }
		] ).exec(function (err, result) {
			// callback(null, result)
			console.log("QQQQQQQQQ",result);
			res.send({
				responseMessage: "Find All getCurrentYearDataMonthWise Graph counts",
				responseCode: 200,
				result: result
			})
		})
},
getCurrentYearDataMonthWiseResumes:async function (req, res) {
	// console.log("HHHHHHHH",req.body,)
	console.log("getCurrentYearDataMonthWiseResumes @$$$@ ",req.body,)

	let datadf=req.body.params
	const monthsArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

	Usercandidate.aggregate( [
	  { 
		  $match: { 
			'candidates.uploaded_on': {$lte: new Date(datadf.dateT),$gte: new Date(datadf.dateF)}
		  }
	  },
	  { 
		  $group: {
			  _id: { "year_month": { $substrCP: [ "$created_at", 0, 7 ] } }, 
			  count: { $sum: 1 }
		  } 
	  },
	  {
		  $sort: { "_id.year_month": 1 }
	  },
	  { 
		  $project: { 
			  _id: 0, 
			  count: 1, 
			  month_year: { 
				//   $concat: [ 
				// 	 { $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
				// 	 "-", 
				// 	 { $substrCP: [ "$_id.year_month", 0, 4 ] }
				//   ] 
				  $concat: [ 
					{ $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
					
				 ] 
			  }
		  } 
	  },
	  { 
		  $group: { 
			  _id: null, 
			  data: { $push: { k: "$month_year", v: "$count" } }
		  } 
	  },
	  {
		  $project: { 
			  data: { $arrayToObject: "$data" }, 
			  _id: 0 
		  } 
	  }
	] ).exec(function (err, result) {
		// callback(null, result)
		console.log("FFFFFFFFFFFF",result);
		res.send({
			responseMessage: "Find All Resumes getCurrentYearDataMonthWise Graph counts",
			responseCode: 200,
			result: result
		})
	})
},
getCurrentYearDataMonthWiseJobs:async function (req, res) {
	console.log("getCurrentYearDataMonthWiseJobs !!!!!",req.body,)
	let datadf=req.body.params
	const monthsArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

	Userpost.aggregate( [
	  { 
		  $match: { 
			created_at: {$lte: new Date(datadf.dateT),$gte: new Date(datadf.dateF)}
		  }
	  },
	  { 
		  $group: {
			  _id: { "year_month": { $substrCP: [ "$created_at", 0, 7 ] } }, 
			  count: { $sum: 1 }
		  } 
	  },
	  {
		  $sort: { "_id.year_month": 1 }
	  },
	  { 
		  $project: { 
			  _id: 0, 
			  count: 1, 
			  month_year: { 
				//   $concat: [ 
				// 	 { $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
				// 	 "-", 
				// 	 { $substrCP: [ "$_id.year_month", 0, 4 ] }
				//   ] 
				  $concat: [ 
					{ $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
					
				 ] 
			  }
		  } 
	  },
	  { 
		  $group: { 
			  _id: null, 
			  data: { $push: { k: "$month_year", v: "$count" } }
		  } 
	  },
	  {
		  $project: { 
			  data: { $arrayToObject: "$data" }, 
			  _id: 0 
		  } 
	  }
	] ).exec(function (err, result) {
		// callback(null, result)
		console.log("WWWWWWWWWWW",result);
		res.send({
			responseMessage: "Find All JOBS getCurrentYearDataMonthWise Graph counts",
			responseCode: 200,
			result: result
		})
	})
},
findGraphCount:async function (req, res) {
	var dateT =[];
	var dateTVal =[];
	var dateTVal1 =[];
	 dateT =req.body
	//  let dateF = req.query.dateF
	for (let d = 0; d <6; d++) {
		const element = dateT[d];
await User.find({ created_at: {$lte: new Date(element.dateT),$gte: new Date(element.dateF)}, } ).count().exec( async function (err, result) {
	let lastFivess = element.dateT.split('/').pop();
	dateTVal.push({count:result,year:+(lastFivess)})
	if(dateTVal.length==6){
		await	res.send({
			responseMessage: "Find All Graph counts",
			responseCode: 200,
			result: dateTVal
		})
	 dateTVal=[]
	}

})







	}


	// let dateF=req.body.dateF
	// let dateF1 = req.query.dateF
    // let dateT1= req.query.dateT
	// var query = [
	// 		{
	// 		$match: {
	// 			created_at: {
	// 				$lte: new Date(dateT1),
	// 				$gte: new Date(dateF1),
	// 			},
	// 		}
	// 	},
	// 	{
	// 		$group: {
	// 			_id: "$_id",
	// 			proposal: {
	// 				$sum: 1
	// 			}
	// 		}
	// 	},
	// 	{
	// 		$project: {
	// 			proposal: 1
	// 		}
	// 	}

	// ]
	// var setQ=[
	// 	{
	// 	  $match: {
	// 		created_at: {
	// 			$lte: new Date(dateT1),
	// 			$gte: new Date(dateF1),
	// 		},
	// 	  }
	// 	},
	// 	{
	// 	  $count: "passing_scores"
	// 	}
	//   ]
	//   console.log("WWWWW",new Date(dateT1),new Date(dateF1));
// var rrr= User.find( { created_at: {$lte: (dateT1),$gte: (dateF1)}, } ).count()
// User.find({ created_at: {$lte: new Date(dateT1),$gte: new Date(dateF1)}, } ).count().exec(function (err, result) {
// 	// User.find({  } ).count().exec(function (err, result) {
// 	console.log("&&&&&&&&&",result);
// 	if (err) {
// 		res.send({
// 			responseMessage: "server err",
// 			responseCode: 500


// 		})
// 	} else {
// 		res.send({
// 			responseMessage: "Find All Graph counts",
// 			responseCode: 200,
// 			result: result

// 		})
// 	}
// })

	// User.aggregate(setQ).exec(function (err, result) {
	// 	// callback(null, result)
	// 	console.log("%%%%%%",result);
	
	// 		})
},
	admin_latest_job_list: function (req, res) {
		Userpost.find({}).sort({
			'created_at': -1
		}).limit(10).exec(function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500
				})

			} else if (result.length == 0) {
				res.send({
					responseMessage: "No post found",
					responseCode: 400
				})

			} else {
				res.send({
					responseMessage: "Client post found",
					responseCode: 200,
					result: result
				})

			}

		})

	},
	admin_All_job_list: function (req, res) {
		Userpost.find({}).sort({
			'created_at': -1
		}).exec(function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500
				})

			} else if (result.length == 0) {
				res.send({
					responseMessage: "No post found",
					responseCode: 400
				})

			} else {
				res.send({
					responseMessage: "Client post found",
					responseCode: 200,
					result: result
				})

			}

		})

	},

	admin_dasboard_count: function (req, res) {
		async.parallel({
			TotalClient: function (callback) {
				User.count({
					user_type: "0"
				}, function (err, result) {
					callback(null, result);
				})

			},

			TotalRecruiter: function (callback) {
				User.count({
					user_type: "1"
				}, function (err, result) {
					callback(null, result);

				})
			},

			TotalactiveClient: function (callback) {
				User.count({
					status: "pending",
					"user_type": "0"
				}, function (err, result) {
					callback(null, result)
				})

			},

			TotalactiveRecruiter: function (callback) {
				User.count({
					status: "pending",
					user_type: "1"
				}, function (err, result) {
					callback(null, result)
				})

			},
			TotalResumeSubmitted: function (callback) {
				//		                callback(null, 0)
				var query = [
					//			    {
					//			     $match :{client_id :mongoose.Types.ObjectId(req.params._id)}
					//			        },
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
						$group: {
							_id: "$job_id",
							proposal: {
								$sum: 1
							}
						}
					},
					{
						$project: {
							proposal: 1

						}
					}

				]
				Usercandidate.aggregate(query).exec(function (err, result) {
					callback(null, result)

				})
			}


		}, function (err, results) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500


				})
			} else {
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

	resdesk_admin: function (req, res) {
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

	admin_view_resume: function (req, res) {
		var query = [

			{
				$match: {
					job_id: mongoose.Types.ObjectId(req.body.job_id)
				}
			}, {
				$unwind: "$candidates"
			}, {
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
					as: "recruiter_id",
					localField: "recruiter_id",
					foreignField: "_id"
				}
			},
			{
				$unwind: "$job_id"
			},
			{
				$unwind: "$recruiter_id"
			},
			{
				$project: {
					"job_id":1,

					// "job_id.job_title": 1,
					// "job_id._id": 1,
					// "job_id.user_id":1,
					"candidates": 1,
					"recruiter_id": 1,
					// "recruiter_id._id": 1,
					// "recruiter_id.user_name": 1
				}
			}
		]

		Usercandidate.aggregate(query).exec(function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500

				})

			}
			else {
				res.send({
					responseMessage: "All cv found",
					responseCode: 200,
					result: result

				})

			}
		})


	},




	admin_cv_shortlist: function (req, res) {
		// recruiterEmailId  candidateEmailId  job_title
console.log("admin_cv_shortlist",req.body)

		Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) }, { $set: { 'candidates.$.ey_shortlist': true ,'candidates.$.admin_accept':true } }, function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500
				})
			}
			else {
				res.send({
					responseMessage: "cv shortlisted suceesfully",
					responseCode: 200
				})
				let subjectEmail = 'Candidate Shortlisted for' +' '+ req.body.job_title
					var htmlContent = spark.CandidateShortlistedforAdmin(req.body.company_name,req.body.job_title,req.body.postDate,req.body.cv);
					 spark.send('noreply@peopleinfinia.com', req.body.recruiterEmailId , subjectEmail, htmlContent, "").then(function (result1) {
						 console.log('save_time_slot_job: Mail successfully sent.');
					 }).catch(err => {
						 console.log('save_time_slot_job: Unable to send mail', err);
					 });	
					//  postPerson_email
					spark.send('noreply@peopleinfinia.com', req.body.postPerson_email , subjectEmail, htmlContent, "").then(function (result1) {
						console.log('save_time_slot_job: Mail successfully sent.');
					}).catch(err => {
						console.log('save_time_slot_job: Unable to send mail', err);
					});
			
			}
		})
	},


	admin_cv_undo: function (req, res) {
		// req.body.recruiterEmailId  req.body.candidateEmailId  req.body.job_title req.body.candidate_id

		Usercandidate.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id), 'candidates._id': mongoose.Types.ObjectId(req.body.candidate_id) }, { $set: { 'candidates.$.ey_shortlist': false } }, function (err, result) {
			if (err) {
				res.send({
					responseMessage: "server err",
					responseCode: 500
				})
			}
			else {
		
				res.send({
					responseMessage: "cv shortlisted suceesfully",
					responseCode: 200
				})
			}
		})
	},



	// To do
	get_issues: async function (req, res) {
		const issues = await Issue.find().sort('question');
		res.send(issues);
	},

	get_issueByID: async function (req, res) {
		const issue = await Issue.findOne({ _id: req.params._id });
		res.send(issue);
	},

	post_issues: async function (req, res) {
		const { error } = validateIssue(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let issue = new Issue({ question: req.body.question });
		issue = await issue.save();

		res.send(issue);
	},

	put_issues: async function (req, res) {
		console.log('@@@@@req.params._id',req.body,req.params._id);


		// const { error } = validateIssue(req.body);
		// if (error) return res.status(400).send(error.details[0].message);

		let body = req.body;
		const issue = await Issue.findByIdAndUpdate(req.params._id, body, { new: true });

		if (!issue) return res.status(404).send('The issue with the given ID was not found.');

		res.send(issue);
	},
	delete_AllUsers: async function (req, res) {
		const issue = await User.remove( );
		res.send('Deleted');

	},
	delete_AllJobs: async function (req, res) {
		const issue = await Userpost.remove( );
		res.send('Deleted');

	},
	delete_AllUserIsses: async function (req, res) {
		const issue = await UserIssue.remove( );
		res.send('Deleted');

	},
	delete_AllUserResumes:async function (req, res) {
		const Usercandidates = await Usercandidate.remove( );
		// const Usercandidatess = await Usercandidate.deleteMany( );
		const interviews = await interview.remove( );
		// console.log("AllUserResumes & interview Deleted")
		res.send('AllUserResumes & interview Deleted');
		
	},
	delete_issues: async function (req, res) {

		console.log('$$$$$req.params._id',req.body,req.params._id);

		// const { error } = validateIssue(req.body);
		// if (error) return res.status(400).send(error.details[0].message);

		let body = req.body;
		const issue = await Issue.findByIdAndRemove(req.params._id, );

		if (!issue) return res.status(404).send('The issue with the given ID was not found.');

		res.send('Deleted');
	},
	get_user_issues: async function (req, res) {
		let query = {};

		// filters
		if (req.query.user) query.user = mongoose.Types.ObjectId(req.query.user);
		if (req.query.issue) query.issue = mongoose.Types.ObjectId(req.query.issue);

		let userIssues = await UserIssue.find(query).populate({ path: 'user', select: 'user_name' }).populate({ path: 'issue', select: 'question' }).sort({ 'created_at': 1 });
		res.send(userIssues);
	},

	put_user_issues: async function (req, res) {
		console.log('req.params._id',req.body,req.params._id);

		// const { error } = validateUserIssue(req.body);
		// console.log('error',error);
		// if (error) return res.status(400).send(error.details[0].message);

		const userIssueCount = await UserIssue.countDocuments({ _id: mongoose.Types.ObjectId(req.params._id) });
		console.log('userIssueCount',userIssueCount);
	
		if (!userIssueCount) return res.status(404).send('Issue not found.');

		let userIssue = await UserIssue.findOne({ _id: mongoose.Types.ObjectId(req.params._id), 'timeline.status': req.body.status });
		console.log('userIssue',userIssue);
		
		if (userIssue) {
			let updatedUserIssue = await UserIssue.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id), 'timeline.status': req.body.status }, { $set: { 'timeline.$.status': req.body.status, 'timeline.$.date': Date.now() } }, { new: true });
			return res.status(200).send(updatedUserIssue);
		} else {
			let timeline = {
				status: req.body.status,
				date: Date.now()
			};

			let updatedUserIssue = await UserIssue.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: { user: req.body.user, issue: req.body.issue }, $push: { timeline } }, { new: true });
			return res.status(201).send(updatedUserIssue);
		}
	}
}

module.exports = admin_user

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
			// postcount.findByIdAndUpdate({_id:mongoose.Types.ObjectId(success_data._id)},{
			//   $inc:postcount
			// },{ projection: postcount , new :true},function(err,updated_count){
			// 		console.log("updated_count",updated_count)
			//   if(err) cb(err,null);
			//   else cb(null,updated_count);
			// })
			postcount.findOneAndUpdate({
				_id: mongoose.Types.ObjectId(success_data._id)
			}, {
					$set: {
						"postcount": success_data.postcount + 1
					}
				}, {
					new: true
				}, {
					postcount: 1
				}, function (err, updated_count) {
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


		// var chkemail = function (email){
		//       return new Promise(data){
		//       	var c = User.findOne({email_id:req.body.email_id},function(err,result){
		//       		if(resolve){
		//       		 resolve(result)
		//       		}
		//       		else{
		//       			 reject(err)
		//       		}
		//       	})
		//       }

		//      } 

		//      var checkPassword  = function (result, password){
		//          return new Promise(data,password){
		//          	if(data.password == req.body.password){
		//          	var d = User.findOne({email_id:result.email_id, password : result.password},function(err, result){
		//          		if(resolve){
		//                        resolve(result)
		//          		}
		//          		else{
		//                     reject(err)
		//          		}
		//          	})
		//          }
		//          else{
		//          	 resolve({"msg" :"please enter correct password"})
		//          }
		//          }

		//      }