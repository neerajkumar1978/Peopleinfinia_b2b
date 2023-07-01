var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var functionalSchema = new Schema({

  value: {
    type: String
  },

  status: {
    type: String
  },

  created_at: {
    type: Date,
    default: Date.now()
  }

});

var functionalArea = mongoose.model('functionArea', functionalSchema)

module.exports = functionalArea;



