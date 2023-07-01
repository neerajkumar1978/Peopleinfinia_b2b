var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({

  job_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'posts'
  },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  },
  candidates: [{
    name: {
      type: String
    },
    age: {
      type: Number
    },
    sex: {
      type: String
    },
    total_experience: {
      type: String
    },
    email: {
      type: String
    },
    experience: {
      type: String
    },
    qualification: {
      type: String
    },
    skill: [],
    phone_number: {
      type: Number
    },
    cv: {
      type: String,
      default: null
    },
    ctc: {
      type: String
    },
    current_organisation: {
      type: String
    },
    current_location: {
      type: String
    },
    countrycode: {
      type: String
    },
    current_country: {
      type: String
    },
    background_check: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      status: "active"
    },
    withdraw: {
      type: Boolean,
      default: false
    },
    ey_shortlist: {
      type: Boolean,
      default: false
    },
    is_candidate_duplicate: {
      type: Boolean,
      default: false
    },
    posted_on: {
      type: String,
      default:null
    },
    admin_accept: {
      type: Boolean,
      default: false
    },
    POSITION: {
      type: String,
      default:null
    },
    DATE_OF_SUBMIT: {
      type: Date,
      // default: new Date()
      // default: Date.now()
      default:new Date()
  
  
  
    },
    AREA_OF_SPECIALIZATION:{ 
       type: String,
      default:null
    },
    uploaded_on: {          // keeps date of the candidate upload on
      type: Date,
      // default: Date.now()
		default:new Date().valueOf()

    }
  }],
  status: {
    type: String
  },

  created_at: {
    type: Date,
    // default: new Date()
    // default: Date.now()
		default:new Date().valueOf()



  }
});

var candidate = mongoose.model('candidate', candidateSchema)

module.exports = candidate;



