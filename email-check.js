// if testing with node, require the json file directly and assign it to a variable;
// if testing with browser, assign the json object to a variable inside the data file and rename that file to '.js'; then
// include the data.js file in a script tag before the script.js file in the html source;

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
for (var key in emailFix) {
  console.log(key + ' was emailed ' + emailFix[key] + ' times');
}