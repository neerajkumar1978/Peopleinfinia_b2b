const jwt = require('jsonwebtoken');
const config = require('./../global_vars/config');
const Joi = require('joi');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let applicantSchema = new Schema({
  date_of_birth_date: {
    type: String,
    default: null,
  },
  date_of_birth_month: {
    type: String,
    default: null,
  },
  date_of_birth_Year: {
    type: String,
    default: null,
  },
  differntly_abled: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  profile_summary: {
    type: String,
    default: null,
  },
  resume_headline: {
    type: String,
    default: null,
  },
  languages: [],
  marital_status: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    default: null,
  },
  area_pin_code: {
    type: String,
    default: null,  },
  industry: [],
  functional_area: [],
  // role: {    type: String,    default: 'Add Role',  },
  role: [],
  job_type: {
    type: String,
    default: 'Add Job Type',
  },
  employement_type: {
    type: String,
    default: 'Add Employement Type',
  },
  preferred_shift: {
    type: String,
    default: 'Add Desired Shift',
  },
  expected_salary_lacs: {
    type: String,
    default: null,
  },
  expected_salary_currency: {
    type: String,
    default: null,
  },
  expected_salary_thousand: {
    type: String,
    default: null,
  },
  desired_location: {
    type: String,
    default: 'Add Desired Location',
  },
  desired_industry: {
    type: String,
    default: 'Add Desired Industry',
  },
  unique_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  type: {
    // fresher or experienced
    type: String,
  },
  email_id: {
    type: String,
  },
  videoCv:{
    type: String,
  default:null
    },
  password: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },

  education: [
    {
      qualification: {
        type: String,
      },
      course: {
        type: String,
      },
      specialization: {
        type: String,
      },
      college: {
        type: String,
      },
      course_type: {
        // fulltime, parttime, correspondence
        type: String,
      },
      passing_year: {
        type: Number,
      },
    },
  ],

  offered_salary_lakhs: {
    type: String,
    default: null,
  },
  offered_salary_thousand: {
    type: String,
    default: null,
  },
  offered_designation: {
    type: String,
    default: null,
  },
  new_company: {
    type: String,
    default: null,
  },
  on_notice: {
    type: Boolean,
    default: false,
  },
  last_working_day_year: {
    type: String,
    default: null,
  },
  last_working_day_month: {
    type: String,
    default: null,
  },
  last_working_day_date: {
    type: String,
    default: null,
  },
  experience_year: {
    type: Number,
    default: 0,
  },
  experience_month: {
    type: Number,
    default: 0,
  },
  currently_working: {
    type: String
 },
  current_location: {
    type: String,
  },
  preferred_location: {
    type: String,
  },
  current_designation: {
    type: String,
  },
  current_company: {
    type: String,
  },
  current_salary_lakhs: {
    // (in lakhs/year)
    type: String,
  },
  current_salary_thousand: {
    type: String,
  },
  current_salary_currency: {
    type: String
  },
  expected_salary: {
    // (in lakhs/year)
    type: String,
  },
  duration_notice_period: {
    type: String,
  },
  employment: [
    {
      designation: {
        type: String,
      },
      company: {
        type: String,
      },
      duration_from_year: {
        type: String,
      },
      duration_from_month: {
        type: String,
      },
      duration_to_year: {
        type: String,
      },
      duration_to_month: {
        type: String,
      },
    },
  ],
  skills: [],
  cv: [
    {
      resumeName:{
       type: String
      },
      resumeFileName : {
      type: String
     },
      resume_path : {
      type: String
     }
  },
  ],
  profile_pic: {
    type: String,
    default:
      'https://cdn2.vectorstock.com/i/thumbs/23/81/default-avatar-profile-icon-vector-18942381.jpg'
  },
  email_verified: {
    // true or false
    type: Boolean,
    default: false,
  },
  timeline: [
    {
      action: {
        type: String,
        enum: [
          'signup',
          'email-verification',
          'call-verification',
          'contract-status',
          'payment-status',
        ],
      },
      status: {
        type: String,
        enum: [
          'pending',
          'completed',
          'verified',
          'not-picked',
          'do-not-want-to-proceed',
          'signed',
          'not-signed',
          'paid',
          'not-paid',
          'any-other',
        ],
      },
      date: Date,
    },
  ],
  created_at: {
    type: Date,
    // default: Date.now(),
		default:new Date().valueOf()

  },
  last_login_at: {
    type: Date,
    default: '',
  },
  applied_jobs: [
    { type: Schema.ObjectId, ref: 'job_posts' }
  ],

  is_block: {
		type: Boolean,
		default: false
  },

  total_experience: {     // in months
    type: Number,
    default: 0
  },

  outsideIndia: { type: String}

});

applicantSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, email_id: this.email_id, unique_id: this.unique_id },
    config.authSecretKey,
    { expiresIn: 60 * 60 * 24 } // 24 hours
  );

  return token;
};

let applicant = mongoose.model('applicant', applicantSchema);

// Joi validation
function validateApplicant(applicant) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    type: Joi.string()
      .min(5)
      .required(),
    email_id: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    mobile: Joi.number()
      .min(8)
      .required(),
    current_location: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    cv: Joi.object().optional(),
    outsideIndia: Joi.string().optional(),
  };

  return Joi.validate(applicant, schema);
}

exports.Applicant = applicant;
exports.validateApplicant = validateApplicant;
