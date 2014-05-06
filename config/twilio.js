module.exports = function() {
  var TWILIO_SID = 'PN53f782161b0b0eace4bfeaa919b13513';
  var TWILIO_AUTH_TOKEN = '3dd21013a1a6182de67c4121e0ce61a7';
  var client = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);
};
