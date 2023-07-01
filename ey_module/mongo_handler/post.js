var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({

  job_id: {
    type: Number
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  company_email: {
    type: String
  },
  job_title: {
    type: String
  },
  postPerson_email: {
    type: String,
    default: null
  },
  postPerson_name: {
    type: String,
    default: null
  },
  industry: {
    type: []
  },
  functional_area: {
    type: []
  },
  skills: [],
   bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  vacancy: {
    type: Number
  },
  gender: {
    type: String
  },
  save_draft: {
    type: Boolean
  },
  duplicate_post: {
    type: Boolean
  },

  Location: [],
  ug_course: [],
  ug_college: {
    type: String
  },
  pg_course: {
    type: String
  },
  pg_college: {
    type: String
  },

  //  qulification :{
  //  	type:String
  //  },
  experience: {
    type: String
  },
  description: {
    type: String
  },
  company_name: {
    type: String
  },
  ctc_min: {
    type: String
  },
  ctc_max: {
    type: String
  },
  perks: {
    type: String
  },
  commission: {
    type: Number
  },
  doc: {
    type: String
  },
  sampleCV: {
    type: String
  },
  deadline: {
    type: String
  },
  notice_period: {
    type: String
  },
  //contact_period:{
  //	type:String
  //},
 
  status: {
    type: String,
    default: "active"
  },
  draft_status: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
		// default: new Date()
		default:new Date().valueOf()

    // default: Date.now()
  },
  submited_at: {
    type: Date,
		default: new Date()
  }

// //NEW ADDED
// working_days: { type: String },
// min_education_type : {type: String },
// min_education_level : { type: String },
// job_responsibility:{ type: String},
// job_type: { type: String},
// pincode: { type: String},
// receiving_emails:[],
// required_exp_qual:{ type: String},
// speaking_lang:[],
// applied_apllicants:[ {type: mongoose.Schema.Types.ObjectId, ref: 'user'}]

});

var post = mongoose.model('post', postSchema)

module.exports = post;



