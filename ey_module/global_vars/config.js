//var DEVTYPE="production";
var DEVTYPE = 'dev';

var config = (function() {
  if (DEVTYPE == 'dev') {
    return {
      // "sparkPostApiKey":"a0d2ac9515a4f1f008fb5605dca4f8da55d73ad1",
      sparkPostApiKey: 'a558a9a2c07f0ef7c83d9500d29d4408cbda66ba', // .live
      port: 1103,
      whitelist: ['http://helposity.mobiloitte.org'],
      authSecretKey: 'xAokLI6AwshKZwZeRbDLjimT3nQmMrfZ',
    };
  } else {
    return {
      // "sparkPostApiKey":"a0d2ac9515a4f1f008fb5605dca4f8da55d73ad1",
      sparkPostApiKey: 'a558a9a2c07f0ef7c83d9500d29d4408cbda66ba',
      port: 80,
      whitelist: ['http://helposity.mobiloitte.org'],
      authSecretKey: 'e)2071Q56N7m9<<9ou8=L8ds5ih:o0',
    };
  }
})();

module.exports = config;
