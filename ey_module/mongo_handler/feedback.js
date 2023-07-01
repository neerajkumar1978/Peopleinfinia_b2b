var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courceSchema = new Schema({
  recruiter_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'pmsuser'
      },
      userIdSend: {
        type: mongoose.Schema.Types.ObjectId, ref: 'pmsuser'
      },
     
 
  message: {
    type: String,
  },
  feedback_period:{
    type: String,
  },
//   startDate:{          type: Date},
//   cource_name: {    type: String,  },
  rating: {
    type: Number,
  },
  
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

var feedback = mongoose.model('feedback', courceSchema);

module.exports = feedback;
