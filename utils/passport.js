const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Customer } = require('../../models/Customer');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretKey";

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Customer.findById(jwt_payload.id)
        .then(customer => {
          if (customer) {
            return done(null, customer);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};