// if testing with node, require the json file directly and assign it to a variable in the script file;
// if testing with browser, assign the json object to a variable in the data file and rename that file to '.js'; then
// include the data.js file in a script tag before the script.js file in the html source;

var emailData = require('./email-log.json');    // object of unsorted, duplicate emails OBJECTS;

var emailModule = (function (log) {
  return {
    findUnique1 : function () {
      var start = Date.now();

      var unique = {};
      for (var i = 0; i < log.emails.length; i++) {
        var email = log.emails[i].email;
        if (unique.hasOwnProperty(email)) {
          unique[email] += 1;
        }
        else {
          unique[email] = 1;
        }
      }
      console.log((Date.now() - start) + ' ms elapsed');
      return unique;
    },

    findUnique2 : function () {
      var start = Date.now();
      var sorted = log.emails.map(function (current) {
        return current.email;
      });

      var previous = null;
      sorted = sorted.sort();   // array of sorted, duplicate emails STRINGS;
      var unique = {};    // object of unique emails STRINGS KEYS -> # of times spammed;

      // this for loop is to find unique emails;
      for (var i = 0; i < sorted.length; i++) {
        if (previous !== sorted[i]) {
          previous = sorted[i];
          unique[sorted[i]] = 1;
        }
        else {
          unique[sorted[i]] += 1;   // DO NOT use postfix increment!
        }
      }
      console.log((Date.now() - start) + ' ms elapsed');
      return unique;
    }
  };
})(emailData);

console.log('calling findUnique1');
var emailFix = emailModule.findUnique1();
for (var key in emailFix) {
  console.log(key + ' was emailed ' + emailFix[key] + ' times');
}

console.log('calling findUnique2');
emailFix = emailModule.findUnique2();
for (key in emailFix) {
  console.log(key + ' was emailed ' + emailFix[key] + ' times');
}
