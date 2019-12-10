const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./userSchema');
const key = 'secret';

const passport = require('passport');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          if(user.isOnline == "true"){
            return done(null, user);
          }
          return done(null, false);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);
