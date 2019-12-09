const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
//const User = require('./userSchema');

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID:
        '801274283364-5dst57p9p461ct36kseq1k20sdqnov2i.apps.googleusercontent.com',
      clientSecret: 'eFcdFv6J62Q6whNwwssq1qj6',
      callbackURL: '/users/google/redirect'
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
