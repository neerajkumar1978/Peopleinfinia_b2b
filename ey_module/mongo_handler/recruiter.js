const jwt = require('jsonwebtoken');
const config = require('./../global_vars/config');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recruiterSchema = new Schema({
	user_type: {     // 0 for company 1 for recruiter  // "superadmin for admin"
		type: String,
		default: '1'
	},
	user_id: {			//Unique Id for company and recruiter
		type: String
	},
	user_name: {
		type: String
	},
	email_id: {
		type: String
	},
	password: {
		type: String
	},
	mobile: {
		type: Number
	},
	company_name: {
		type: String
	},
	company_size: {
		type: String
	},
	profile_pic: {
		type: String
	},
	is_block: {
		type: Boolean,
		default: false
	},
	hear_about_us: {
     type: String
	},
	status: {
		type: String,
		default: "pending"
	},
	is_login: { // true or false
		type: Boolean,
		default: false
	},
	is_first_login: { // true or false
		type: Boolean,
		default: false
	},
	is_emailVerify: {  // true or false
		type: Boolean,
		default: false
	},
	is_otpVerify: {  // true or false
		type: Boolean,
		default: false
	},
	timeline: [{
		action: { type: String, enum: ['signup', 'email-verification', 'call-verification', 'contract-status', 'payment-status'] },
		status: { type: String, enum: ['pending', 'completed', 'verified', 'not-picked', 'do-not-want-to-proceed', 'signed', 'not-signed', 'paid', 'not-paid', 'any-other'] },
		date: Date
	}],
	created_at: {
		type: Date,
		default: Date.now()
	},
	last_login_at: {
		type: Date,
		default: ''
	},	billing_address:
    {
        address: {type: String,default:null},
        city: {type: String,default:null},
        state: {type: String,default:null},
        pincode: {type: String,default:null}
    },
	subscription_active: { type: Boolean, default: false },
	resume_viewed: { type: Number, default: 0 },
	subscription_expired_on: { type:String, default: null },
	subscription_plan: [
	  {
		type: { type: String},
		payment_id: { type: String },
		sub_date: { type: Date }
	  }
	],
});

recruiterSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, user_id: this.user_id, email_id: this.email_id, user_type: this.user_type },
		config.authSecretKey,
		{ expiresIn: 60 * 60 * 24 }			// 24 hours
	);

	return token;
}

let recruiter = mongoose.model('recruiter', recruiterSchema);

module.exports = recruiter;