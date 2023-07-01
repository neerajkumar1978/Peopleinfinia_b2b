let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = new Schema({
  user_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  order_id: { type: String, reuired: true},
  amount: { type: Number, required: true},
  status: { type: String},
  payment_id: {type: String},
  created_at: { type: Date, 
	//	default:new Date().valueOf()
  	// default:new Date().valueOf()
		default:new Date()
  },
  submit_at: { type: Date, 
  	 default:new Date().valueOf()

  },
  updated_at: { type: String},
  invoiceNo: { type: Number},
  paymnet_mode: {type: String},
})

var orders = mongoose.model('payment_details', orderSchema)

module.exports = orders;
