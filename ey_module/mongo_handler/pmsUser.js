var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('./../global_vars/config');
const Joi = require('joi');
var pmsSchema = new Schema({
    designation: {
    type: String,
  },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  },
  status: {
    type: Boolean,
    default:true
  },
  onboarding: {
    type: Boolean,
    default:false
  },
  email_id: {
    type: String,
    unique: "true",
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please Enter a valid email address']

  },
  joiningDate:{
// type:Date
type: String
  },
  dateOfBirth:{
    // type:Date
    type: String
      },
      
    exp: {
      type: [{
          from: {
              type: String,
              default: null
          },
          to: {
              type: String,
              default: null
          },
          CompanyName: {
              type: String
          },
          designation: {
              type: String
          }
      }],
      default: []
  },
  Qualification:{          type: String,default: null},
  PassingYear:{          type: String,default: null},
  Specialization:{          type: String,default: null},
  address:{          type: String,default: null},
  cource: {
    type: [{
        courceId: {            type: Schema.Types.ObjectId        },
        startDate:{          type: String,},
        endDate:{          type: String,},
        cource_mail: {          type: String,        },
        cource_password: {          type: String,        },
        StartTime: {          type: String,        },
        EndTime: {          type: String,        },
        cource_link: {          type: String,        },
        CourcePerc: {            type: Number        },
        // EndTime: {          type: String,        },
      }]
  },
  sendCredential:{
    type: String,
    default:null
  },
  sendCredentialDate:{
    type: Date,
    // default: Date.now(),
  },
  mobile: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  feedback_period:{
    type: Date,
    default:Date.now(),
  },
  review_period:{
    type: Date,
    default:Date.now(),

  },
  lastName: {
    type: String,
  },
  remarks: {
    type: String,
  },
  userLocation: {
    type: String,
  },
  password: {
    type: String,
  },
  profile_pic: {
    type: String,
    default:
      'https://cdn2.vectorstock.com/i/thumbs/23/81/default-avatar-profile-icon-vector-18942381.jpg'
  },
  unique_id: {
    type: String,
  },
  reportingManager: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  is_first_login: { // true or false
		type: Boolean,
		default: false
	},
  last_login_at: {
		type: Date,
		default: null
	},
  followUp:{
    type: String,
default:null
  },
  introductiondate: {
    type: Date,
    // default: Date.now(),
  },
  
  introduction:{
    type: String,
default:null
  },
  SignW_4Form:{
    type: String,
default:null
  },
  date_SignW_4Form:{
    type: String,
default:null
  },
  SignI_9Form:{
    type: String,
default:null
  },
  date_SignI_9Form:{
    type: String,
default:null
  },
  SignNon_dis_Agre:{
    type: String,
default:null
  },
  user_id: {			
		type: String
	},
  date_SignNon_dis_Agre:{
    type: String,
default:null
  },
  MeetingWithHRManager: {
    type: [{
      addTitle: String,
        startDate: Date,
        startDateTime : Date,
        created_at: Date,
        endDate : Date,
        endDateTime: Date,
        addRequiredAtte: String,
        addChannel: String,
        addLocation: String,
        recruiter_id: Schema.Types.ObjectId,
        discription: String,
        trainer: String,
        employeeId: {
          type: String,
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
    }]
},
Training: {
  type: [{
    addTitle: String,
      startDate: Date,
      created_at: Date,
      endDate: Date,
      addRequiredAtte: String,
      addChannel: String,
      addLocation: String,
      recruiter_id: Schema.Types.ObjectId,
      discription: String,
      trainer: String,
      employeeId: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
  }]
},
  teamMeeting: {
    type: [{
      created_at: Date,
      teamMeetingDate: String,
      userId: Schema.Types.ObjectId,
      email_id: {
        type: String,
      },
      employeeId: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      companyName: {
        type: String,
      },
      compantSize: {
        type: String,
      },
      discription: {
        type: String,
      },
    }]
  },


ScheduleAdditionalTraining: {
  type: [{
    addTitle: String,
      startDate: Date,
      created_at: Date,
      endDate: Date,
      addRequiredAtte: String,
      addChannel: String,
      addLocation: String,
      recruiter_id: Schema.Types.ObjectId,
      discription: String,
      trainer: String,
      employeeId: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
  }]
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
});
pmsSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, user_id: this.unique_id, email_id: this.email_id},
		config.authSecretKey,
		{ expiresIn: 60 * 60 * 24 }			// 24 hours
	);

	return token;
}

var pmsuser = mongoose.model('pmsuser', pmsSchema);

module.exports = pmsuser;
