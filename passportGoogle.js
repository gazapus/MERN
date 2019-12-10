const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./userSchema');

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID:
        '801274283364-5dst57p9p461ct36kseq1k20sdqnov2i.apps.googleusercontent.com',
      clientSecret: 'eFcdFv6J62Q6whNwwssq1qj6',
      callbackURL: '/users/google/redirect'
    },
    async function(accessToken, refreshToken, profile, cb, done) {
      let userExist = await User.find({email: cb.emails[0].value});
      var user;
      if(userExist.length === 0){
        var newUser = new User({
          username: cb.name.givenName + cb.id,
          email: cb.emails[0].value,
          photoURL: cb.photos[0].value,
          firstName: cb.name.givenName,
          lastName: cb.name.familyName,
          isOnline: true
        });
        user = await newUser.save()
      }else{
        userExist[0].isOnline = true;
        user = await userExist[0].save();
      }
      return done(null, user);
    }
  )
);