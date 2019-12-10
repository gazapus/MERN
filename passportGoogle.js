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
    function(accessToken, refreshToken, profile, cb, done) {
      var data = {
        id: cb.id,
        firstName: cb.name.givenName,
        lastName: cb.name.familyName,
        email: cb.emails[0].value,
        photoURL: cb.photos[0].value
      };
      return done(null, data);
    }
  )
);

/*1-login with google
2-get data from passport validation
3-en redirect: 
	check if the data user exits.
	if so then create the token
	else create user, create account with that information and create the token
4-return....*/