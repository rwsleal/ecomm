import * as fs from 'fs';
import { searchUserAccountByEmailUseCase } from './searchUserAccountByEmail';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));

const removeUserUseCase = (email) => {
    const userToBeRemoved = searchUserAccountByEmailUseCase(email);

    if (userToBeRemoved) {
        const userIndex = accounts.indexOf(userToBeRemoved);

        accounts.splice(userIndex, 1);
    }

    return accounts.includes(userToBeRemoved);
} 