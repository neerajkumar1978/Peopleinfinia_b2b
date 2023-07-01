'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var countSchema = new Schema({
  postcount: {
    type: Number,
  },
});
var count = mongoose.model('postcount', countSchema);

function init() {
  count.count({}, function(err, data) {
    if (err) {
      console.log('Server error');
    } else if (data == 0) {
      var obj = {
        postcount: 1000001,
      };
      var savaData = new count(obj);
      savaData.save(function(err, user) {
        if (err) console.log('Server error');
        else console.log('details saved.');
      });
    } else {
      console.log('data already exist');
    }
  });
}

init();

module.exports = count;
