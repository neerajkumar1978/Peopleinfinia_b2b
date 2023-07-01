var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interviewSchema = new Schema({

  job_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'post'
  },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'candidate'
  },
  candidate_name: {
    type: String
  },
  location: {
    type: String
  },
  link:{
    type: String,default:null
  },
  interview_time: {
    type: String
  },
  interview_date: {
    type: String
  },
  interview_type: {
    type: String
  },
  interview_person: {
    type: String
  },
  status: {   // flag => 0: Default (Active), 1: Confirmed by recruiter 
    type: Number,
    default: 0
  },
  reschedule: {     // flag => 0: Default (Nothing), 1: reschedule requested from recruiter, 2: reschedule processed by company
    type: Number,
    default: 0
  },
  reschedule_reason: {
    type: String
  },
  reschedule_recruiter_dates: {
    type: []
  },
  created_at: {
    type: Date,
    // default: Date.now()
		// default: new Date()
		default:new Date().valueOf()


  }
});

var interview = mongoose.model('interview', interviewSchema)

module.exports = interview;
