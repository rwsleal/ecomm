import { createUserUseCase } from "../src/use-case/createUserAccount.js";
import { createUserAddressUseCase } from "../src/use-case/createUserAddress.js";
import { filterByUserUFUseCase } from "../src/use-case/filterByUserUF.js";

const usersToBeCreated = [
    ['Josué Lima', 'josuelima@email.com', 'senhaDoJosue'],
    ['Marcelo Rosa', 'marcelorosa@email.com', 'senhadomarcelo'],
    ['Samuel Freitas', 'samuelfreitas@email.com', 'senhadosamuel'],
    ['Esther Monteiro', 'esthermonteiro@email.com', 'senhadaesther'],
];

const usersAdresses = [
    ['marcelorosa@email.com', { uf: 'MG'}],
    ['samuelfreitas@email.com', { uf: 'SP'}],
    ['esthermonteiro@email.com', { uf: 'SP'}],
];

usersToBeCreated.forEach((user) => {
    const [nome, email, password] = user;
    createUserUseCase(nome, email, password)
});

usersAdresses.forEach((userAddress) => {
    const [email, address] = userAddress;
    createUserAddressUseCase(email, address);
});

const caseItFilter = filterByUserUFUseCase('SP');
const caseItNotFilter = filterByUserUFUseCase('BA');

console.log('Response when it succeeds:', '\n',caseItFilter);
console.log('Response when it fails:', '\n', caseItNotFilter);