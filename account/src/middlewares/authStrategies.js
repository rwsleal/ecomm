import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Account from '../models/Account.js';
import { checkPassword } from '../helpers/bcryptHelper.js';

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
                return done(new Error('401|Invalid email provided'));
            }

            const check = checkPassword(password, account.password);
            
            if (!check) {
                console.log(check);
                return done(new Error('401|Invalid password provided'));
            }

            return done(null, account);
        });
    }),
);

// eslint-disable-next-line import/prefer-default-export
export { LocalStrategy };