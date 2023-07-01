var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courceSchema = new Schema({
  recruiter_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
      },
    cource_name: {
    type: String,
  },
  cource_link: {
    type: String,
  },
  startDate:{          type: String},
  endDate:{          type: String},
  cource_mail: {          type: String,        },
  cource_password: {          type: String,        },
  status: {
    type: String,
  },
  
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

var cource = mongoose.model('cource', courceSchema);

module.exports = cource;
