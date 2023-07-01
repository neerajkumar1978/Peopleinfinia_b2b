
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
  recruiter_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
      },
      create_userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'pmsuser'
      },
      description:{ type: String},
  Progress: { type: String},
endDate:  { type: String},
goalName:  { type: String},
goalPer:  { type: Number},
goalStatus:  { type: String},
goalType:  { type: String},
goal_description:  { type: String},
keyResult: { type: String},
key_description: { type: String},
startDate: { type: String},
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

var goal = mongoose.model('goal', goalSchema);

module.exports = goal;


