/* eslint-disable import/prefer-default-export */
import * as fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));

const filterByUserUFUseCase = (uf) => {
    const filteredByUF = accounts.filter(({ address }) => address?.uf === uf);

    if (!filteredByUF.length) return false;

    return filteredByUF;
};

export { filterByUserUFUseCase };