var emailData = require('./email-log.json');

var emailModule = (function (log) {

  return {
    findUnique : function () {
      var sorted = log.emails.map(function (current) {
        return current.email;
      });
      var unique = {};
      var previous = null;
      sorted = sorted.sort();

      for (var i = 0; i < sorted.length; i++) {
        if (previous !== sorted[i]) {
          previous = sorted[i];
          unique[sorted[i]] = 1;
        }
        else {
          unique[sorted[i]] += 1;   // DO NOT use postfix increment!
        }
      }
      return unique;
    }
  };
})(emailData);
var emailFix = emailModule.findUnique();

for (key in emailFix) {
  console.log(key + ' was emailed ' + emailFix[key] + ' times');
}