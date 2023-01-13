import * as fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));

const changeUserNameUseCase = (email, newName) => {
    const userNameToBeChanged = accounts.find((user) => email === user.email);

    if (userNameToBeChanged) {
        const userIndex = accounts.indexOf(userNameToBeChanged);

        accounts.splice(userIndex, 1, {...userNameToBeChanged, name: newName});

        fs.writeFileSync('./src/use-case/accounts.json', JSON.stringify(accounts));

        return accounts.some((user) => user.email === email && user.name === newName);
    }

    return false

}

export { changeUserNameUseCase }