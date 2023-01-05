import * as fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));


const searchUserAccountByEmailUseCase = (email) => {
    const userByEmail = accounts.find((user) => email === user.email);

    if (!userByEmail) return 'An account associated to the provided email has not been found';

    return userByEmail
}

export { searchUserAccountByEmailUseCase }