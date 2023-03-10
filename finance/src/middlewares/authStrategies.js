const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { checkToken } = require('../helpers/jwtHelper.js');

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = checkToken(token);
                done(null, payload.id, { token });
            } catch (err) {
                done(err);
            }
        },
    ),
);

// eslint-disable-next-line import/prefer-default-export
module.exports = BearerStrategy;