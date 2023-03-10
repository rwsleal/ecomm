import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Account from '../models/Account.js';
import { checkPassword } from '../helpers/bcryptHelper.js';
import { checkToken } from '../helpers/jwtHelper.js';

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, (email, password, done) => {
        Account.findOne({ email }, async (err, account) => {
            if (err) {
                return done(err);
            }
            if (account === null) {
                return done(new Error('401|Invalid credentials provided'));
            }

            const check = checkPassword(password, account.password);

            if (!check) {
                console.log(check);
                return done(new Error('401|Invalid credentials provided'));
            }

            return done(null, account);
        });
    }),
);

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = checkToken(token);
                const account = await Account.findOne({ id: payload.id });
                done(null, account, { token });
            } catch (err) {
                done(err);
            }
        },
    ),
);

// eslint-disable-next-line import/prefer-default-export
export { LocalStrategy };