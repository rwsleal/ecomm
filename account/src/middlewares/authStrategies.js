import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Account from '../models/Account.js';
import { checkPassword, hashPassword } from '../helpers/bcryptHelper.js';

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, (email, password, done) => {
        Account.findOne({ email }, (err, account) => {
            if (err) {
                return done(err);
            }
            if (account === null) {
                return done(() => {
                    throw new Error('401|Invalid email provided');
                });
            }

            checkPassword(password, hashPassword(password));

            return done(null, account);
        });
    }),
);

// eslint-disable-next-line import/prefer-default-export
export { LocalStrategy };