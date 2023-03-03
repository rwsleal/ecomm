/* eslint-disable import/prefer-default-export */
import * as fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));

const searchUserAccountByEmailUseCase = (email) => {
    const userByEmail = accounts.find((user) => email === user.email);

    if (!userByEmail) return null;

    return userByEmail;
};

export { searchUserAccountByEmailUseCase };