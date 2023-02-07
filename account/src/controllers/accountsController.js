import Account from '../models/Account.js';

const getAll = (_req, res) => {
    Account.find((_err, accounts) => res.status(200).json(accounts));
};

export { getAll };