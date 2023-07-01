var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var fs = require('fs');
var async = require('async');
/*
var https = require('https')

var options = {
  key: fs.readFileSync('./certificates/peopleinfinia_com.key'),
  cert: fs.readFileSync('./certificates/peopleinfinia_com.crt'),
  ca: fs.readFileSync('./certificates/peopleinfinia_com.ca-bundle')
};
//console.log(options);

var options = {
      key: fs.readFileSync('./certificates/key.pem', 'utf8'),
      cert: fs.readFileSync('./certificates/server.crt', 'utf8')
    };

https.createServer(options, app).listen(443);
var server = app.listen(80, function () {
  var host = server.address().address;
  console.log("host", host)
  var port = server.address().port;
  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.info('\n\n\nServer is listening at http://%s:%s\n\n\n', add, port);
  })
});
*/
const fileUpload = require('express-fileupload');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:19000/employer');
mongoose.connect('mongodb://localhost:27017/employer');
var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: 'application/json',
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: 'application/x-www-form-urlencoding',
});

var userRoute = require('./routes/user.js');
var candidateRoute = require('./routes/candidate.js');
var postRoute = require('./routes/post.js');
var interviewRoute = require('./routes/interview.js');
var recruiterRoute = require('./routes/recruiter.js');

var adminRoute = require('./routes/admin.js');
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
//var corsOptions = {
//	origin: function (origin, callback) {
//		var originIsWhitelisted = config.whitelist.indexOf(origin) !== -1;
//		callback(null, originIsWhitelisted);
//	}
//};
//app.use(cors(corsOptions));
app.use(bodyParser.json()); // https://gitlab.com/manreetsr/peopleinfinia.git
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if ('OPTIONS' === req.method) {
    console.log("running..")
    res.send(200);
  } else {
    next();
  }
});

app.use('/temp', express.static(path.join(__dirname, 'temp')));

app.use("/cdn", express.static('public'));

app.use('/media', fileUpload());

app.post('/media/upload', function (req, res, next) {
  // var _dir=req.params.sectionName;
  var _dir = 'temp';
  async.waterfall(
    [
      function (cb) {
        var _dirName = path.join(__dirname, _dir);
        console.log('_dirName----', _dirName);
        var _isDirExist = fs.existsSync(_dirName);
        if (_isDirExist) cb(null, _dirName);
        else {
          fs.mkdir(_dirName, function () {
            cb(null, _dirName);
          });
        }
      },
      function (filePath, cb) {
        console.log('filePath----', filePath);
        console.log(req.files);
        var _content = req.files.files.name;
        console.log('_content', _content);
        var checkFileName = function (_name, filePath, _ext) {
          var _fileName = path.join(filePath, _name + '.' + _ext);
          if (fs.existsSync(_fileName)) {
            return checkFileName(
              new Date().getTime().toString(),
              filePath,
              _ext
            );
          } else {
            return _fileName;
          }
        };
        var _isArray = Array.isArray(_content);
        if (_isArray) {
          async.map(
            _content,
            function (data, cbmap) {
              var _name = data.name.split('.');
              console.log('name--->', _name);
              var fileName = checkFileName(
                new Date().getTime().toString(),
                filePath,
                _name[1]
              );
              console.log('fileName--->', fileName);
              //
              data.mv(fileName, function (err) {
                if (err) cbmap(err, null);
                else {
                  cbmap(null, {
                    file: path.join(
                      _dir,
                      fileName.split('/')[fileName.split('/').length - 1]
                    ),
                    isTemp: true,
                  });
                }
              });
            },
            function (err, resmap) {
              if (err) cb(err, null);
              cb(null, resmap);
            }
          );
        } else {
          var _name = _content.split('.');

          console.log('name--->', _name);
          var fileName = checkFileName(
            new Date().getTime().toString(),
            filePath,
            _name[1]
          );
          // var fileName=path.join(filePath,new Date().getTime().toString()+"."+_name[1]);
          console.log('fileName--->', fileName);

          //
          req.files.files.mv(fileName, function (err) {
            if (err) cb(err, null);
            else {
              cb(null, {
                file: path.join(
                  _dir,
                  fileName.split('/')[fileName.split('/').length - 1]
                ),
                isTemp: true,
              });
            }
            localhost: 27017;
          });
        }
      },
    ],
    function (err, result) {
      err ? res.status(500).send(err) : res.send(result);
    }
  );
});

// app.get('/', function (req, res,next) {
//     res.sendFile(__dirname + '/dist/employerYaari/index.html');
// });
// app.use(express.static(path.join(__dirname, 'dist/employerYaari')));
// app.use('/',express.static('dist/employerYaari', { redirect: false }));

// app.use('/admin', express.static('dist/admin', { redirect: false }));

// app.get('/index', function (req, res, next) {
//    res.sendFile(path.resolve('dist/employerYaari/index.html'));
// });
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/employerYaari/index.html'));
// });

app.use(express.static(path.join(__dirname, 'dist/employerYaari')));

app.use('/user', userRoute);
app.use('/userb', userRoute);

app.use('/candidate', candidateRoute);
app.use('/post', postRoute);
app.use('/interview', interviewRoute);
app.use('/admin', adminRoute);
app.use('/recruiter', recruiterRoute);

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/employerYaari/index.html'));
});

/*
var listener = app.listen(3000, function (err, success) {            //for localhost
  console.log('Listening on port-->> ' + listener.address().port);
});
*/

var listener = app.listen(8002, function(err, success) {            //for live
  console.log('Listening on port-->> ' + listener.address().port);
});
