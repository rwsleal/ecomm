import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import checkToken from '../helpers/jwtHelper.js';

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

export default BearerStrategy;