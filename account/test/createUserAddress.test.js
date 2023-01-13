import { createUserAddressUseCase } from "../src/use-case/createUserAddress.js";

const AddressMock = {
    logradouro: 'Rua das Pedras',
    número: 318,
    complemento: 'casa',
    bairro: 'Jardim dos Prados',
    cep: '38123-201',
    cidade: 'Caldencia',
    uf: 'MG'
}

const caseItCreate = createUserAddressUseCase('josuelima@email.com', AddressMock);
const caseItNotCreate = createUserAddressUseCase('email@email.com', AddressMock);

console.log('Response when it succeeds:', '\n',caseItCreate);
console.log('Response when it fails:', '\n', caseItNotCreate);