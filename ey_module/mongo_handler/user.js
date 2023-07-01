const jwt = require('jsonwebtoken');
const config = require('./../global_vars/config');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	user_type: {     // 0 for company 1 for recruiter  // "superadmin for admin"
		type: String
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
	
	countrycode: {
		type: String
	  },
	company_name: {
		type: String
	},
	company_description: {
		type: String
	},
	rate_of_staffing: {
		type: Number
	},
	employe_strength: {
		type: String
	},
	office_address: {
		type: String
	},
	industry_type: {
		type: String
	},
	date_of_aggrement: {
		type: String
	},
	aggrement_start_date: {
		type: String
	},
	aggrement_end_date: {
		type: String
	},
	
	profile_pic: {
		type: String,
		default: 'https://cdn2.vectorstock.com/i/thumbs/23/81/default-avatar-profile-icon-vector-18942381.jpg'
	  },
	bookmarks: [
		{
			type: mongoose.Schema.Types.ObjectId, ref: 'post'
		}
	],
	type: {    // recruiter type: Individual, Firm
		type: String,
		default:null

	},
	institutionName: {    // recruiter type: institution
		type: String,
		default:null
	},
	Graduation: {    
		type: String,
		default:null
	},
	Post_Graduation: {    
		type: String,
		default:null
	},
	Graduation_Other: {    
		type: String,
		default:null
	},
	Post_Graduation_Other: {    
		type: String,
		default:null
	},
	regType: {    // recruiter type: institution
		type: String,
		default:null
	},
	experience: {
		type: String
	},
	naukri_portal_login: {
		type: Boolean,
		default:false

	},
	city: {
		type: String
	},
	recruiter_working_type: {
		type: String
	},
	working_package: {
		type: String
	},
	functional_expert: {
		type: []
	},
	industry_expert: {
		type: []
	},
	contactNos:{
		type: [{
		// type: []
		countryCode: String,
        dialCode: String,
        internationalNumber: String,
        number: String,
        nationalNumber: String,
	}]
	},
	ctc_worked: {
		type: String
	},
	commision: {
		type: String
	},
	pan_number: {
		type: String,
		default:null
	},
	gst_number: {
		type: String,
		default:null
	},
	is_block: {
		type: Boolean,
		default: false
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
		// default: Date.now()
		default:new Date().valueOf()
		// default: new Date()
	},
	submited_at: {
		type: Date,
			default: new Date()
	  },
	last_login_at: {
		type: Date,
		default: ''
	},

	// new for recruiter
	hear_about_us:{
		type: String
	},
	company_size:{
		type:String
	},
	billing_address:
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

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, user_id: this.user_id, email_id: this.email_id, user_type: this.user_type },
		config.authSecretKey,
		{ expiresIn: 60 * 60 * 24 }			// 24 hours
	);

	return token;
}

let user = mongoose.model('user', userSchema);

module.exports = user;
