const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./Schemas/userSchema');
const keys = require('./keys');

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: keys.idClientGoogle,
      clientSecret: keys.secretKeyGoogle,
      callbackURL: '/users/google/redirect'
    },
    async function(accessToken, refreshToken, profile, cb, done) {
      let userExist = await User.find({ email: cb.emails[0].value });
      var user;
      if (userExist.length === 0) {
        var newUser = new User({
          username: cb.name.givenName + cb.id,
          email: cb.emails[0].value,
          photoURL: cb.photos[0].value,
          firstName: cb.name.givenName,
          lastName: cb.name.familyName,
          favourites: []
        });
        user = await newUser.save();
      } else {
        user = await userExist[0].save();
      }
      return done(null, user);
    }
  )
);
