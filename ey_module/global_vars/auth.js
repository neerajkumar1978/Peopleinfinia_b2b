const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  console.log("ttt",req.url,req.baseUrl,token); //eswar

//   if (byPassUrls.includes(req.url)) {
//     deferred.resolve()
// } else {
  // user/verfication_payment
  if(req.baseUrl == '/userb'){
    next()
  }else{
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.authSecretKey);
    // console.log('jwt decoded: ', decoded); eswar
    if (req.baseUrl === '/admin' && decoded.user_id !== 'admin') {
      return res.status(403).send('Access denied.');
    }
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }}
  // next();
};
