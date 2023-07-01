var xlsx = require('node-xlsx');
var async = require('async');
var path = require('path');
var xmlCsvParser = {
  parse: function(filePath) {
    return new Promise(function(resolve, reject) {
      try {
        var data = xlsx.parse(filePath);
        var _sheets = {};
        var _sheetCols = {};
        //var arr=[];
        //console.log("data.length--->",data.length);
        for (var i = 0; i < data.length; i++) {
          //console.log("data[i].name--->",data[i].name);
          _sheets[data[i].name] = [];
          var _data = data[i].data.filter(x => x.length > 0);
          // console.log("data[i].data.length--->",data[i].data.length);
          // console.log("_data.length--->",_data.length);
          for (var j = 1; j < _data.length; j++) {
            var obj = {};
            // console.log("_data[j].length--->",_data[j].length);
            // console.log("_data[j]--->",_data[j]);

            for (var k = 0; k < _data[j].length; k++) {
              if (_data[j][k]) obj[_data[0][k]] = _data[j][k].toString().trim();
            }

            _sheets[data[i].name].push(obj);
          }
        }
        //console.log("_sheets------->",_sheets);
        resolve(_sheets);
      } catch (e) {
        console.log('exception---->', e);
        reject(e);
      }
    });
  },
};
module.exports = xmlCsvParser;
