import Account from '../models/Account.js';
import { hashPassword } from '../helpers/bcryptHelper.js';
import { createToken } from '../helpers/jwtHelper.js';

const login = (req, res) => {
    const { id } = req.user;
    const token = createToken(id);

    res.status(204).set('Authorization', token).send();
};

const getAll = (_req, res) => {
    Account.find((_err, accounts) => res.status(200).json(accounts));
};

const getById = (req, res, next) => {
    const { id } = req.params;

    Account.findOne({ _id: id }, (err, account) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(account);
        }
    });
};

const create = async (req, res, next) => {
    const { password } = req.body;
    const passwordHash = await hashPassword(password);
    const newAccount = { ...req.body, password: passwordHash };
    const account = new Account(newAccount);

    account.save((err) => {
        if (err) {
            next(err);
        } else {
            res.status(201).set('Location', `/admin/accounts/${account.id}`).json(account);
        }
    });
};

const update = (req, res, next) => {
    const { id } = req.params;

    Account.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, account) => {
        if (err) {
            next(err);
        } else {
            res.status(200).set('Location', `/admin/accounts/${account.id}`)
                .send({ message: 'Account successfully updated' });
        }
    });
};

const remove = (req, res, next) => {
    const { id } = req.params;

    Account.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
            next(err);
        } else {
            res.status(204).end();
        }
    });
};

export { login, getAll, getById, create, update, remove };