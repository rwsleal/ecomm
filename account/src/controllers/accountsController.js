import Account from '../models/Account.js';

const getAll = (_req, res) => {
    Account.find((_err, accounts) => res.status(200).json(accounts));
};

const getById = (req, res, next) => {
    const { id } = req.params;

    Account.findById(id, (err, account) => {
        if (err) {
            next(err);
        } else {
            res.status(201).json(account);
        }
    });
};

const create = (req, res, next) => {
    const account = new Account(req.body);

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

    Account.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, account) => {
        if (err) {
            next(err);
        } else {
            res.status(200).set('Location', `/admin/accounts/${account.id}`)
                .send({ message: 'account successfully updated' });
        }
    });
};

const remove = (req, res, next) => {
    const { id } = req.params;

    Account.findByIdAndDelete(id, (err) => {
        if (err) {
            next(err);
        } else {
            res.status(204).json({ message: 'account successfully deleted' });
        }
    });
};

export { getAll, getById, create, update, remove };