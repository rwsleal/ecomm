/* eslint-disable import/prefer-default-export */
const orderReturnMock = {
    _id: '63ed7cdae209623a8c537180',
    createdDate: '2023-02-16T00:46:18.000Z',
    clientId: '63c9c9cfc0c3ad8ecc9157e7',
    deliveryAddress: {
        street: 'Rua Ademar de Moraes Seckler',
        number: '38',
        complement: 'S/N',
        district: 'Jardim Moacyr Arruda',
        cep: '13338260',
        city: 'Indaiatuba',
        state: 'SP',
    },
    products: [
        {
            product: 'iPhone 13 Pro',
            quantity: 2,
            unitPrice: 9176,
            discount: 9153,
        },
    ],
};

const patchOrderReturnMock = { ...orderReturnMock, status: 'PAID', __v: 0 };

const fetchAccountReturnMock = {
    _id: '63c9c9cfc0c3ad8ecc9157e7',
    name: 'Lorena Alana Mendes',
    email: 'lorenamendes@email.com',
    password: '4cab2a2db6a3c31b01d804def28276e6',
    createdDate: '2023-01-19T22:53:03.402Z',
    cpf: '36391181896',
    phone: '5583988939542',
    address: {
        street: 'Rua Agenor Marinho de Souza',
        number: '485',
        district: 'Jardim Cidade Universitaria',
        cep: '58052180',
        city: 'Joao Pessoa',
        state: 'PB',
        complement: 'S/N',
    },
};

export { orderReturnMock, patchOrderReturnMock, fetchAccountReturnMock };