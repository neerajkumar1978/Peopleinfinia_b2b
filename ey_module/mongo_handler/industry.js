var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var industrySchema = new Schema({
  value: {
    type: String,
  },

  status: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

var industry = mongoose.model('industry', industrySchema);

module.exports = industry;
