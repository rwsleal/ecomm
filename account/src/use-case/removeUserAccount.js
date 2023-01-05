import * as fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));

const removeUserUseCase = (email) => {
    const userToBeRemoved = accounts.find((user) => email === user.email);

    if (userToBeRemoved) {
        const userIndex = accounts.indexOf(userToBeRemoved);

        accounts.splice(userIndex, 1);

        fs.writeFileSync('./src/use-case/accounts.json', JSON.stringify(accounts));

        return !accounts.includes(userToBeRemoved);
    }

    return false
}

export { removeUserUseCase };