/* eslint-disable import/prefer-default-export */
import * as fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));

const createUserAddressUseCase = (email, address) => {
    const userToCreateAddress = accounts.find((user) => email === user.email);

    if (userToCreateAddress) {
        const userIndex = accounts.indexOf(userToCreateAddress);

        const userWithAddress = { ...userToCreateAddress, address };

        accounts.splice(userIndex, 1, userWithAddress);

        fs.writeFileSync('./src/use-case/accounts.json', JSON.stringify(accounts));

        return accounts.some((user) => user.email === email && user.address === address);
    }

    return false;
};

export { createUserAddressUseCase };