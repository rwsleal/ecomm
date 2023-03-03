const accountAddressMock = {
    street: 'Rua Agenor Marinho de Souza',
    number: '485',
    district: 'Jardim Cidade Universitaria',
    cep: '58052180',
    city: 'Joao Pessoa',
    state: 'PB',
    complement: 'S/N',
};

const allAccountsMock = [
    {
        _id: '63c9c9cfc0c3ad8ecc9157e7',
        name: 'Lorena Alana Mendes',
        email: 'lorenamendes@email.com',
        password: '4cab2a2db6a3c31b01d804def28276e6',
        createdDate: '2023-01-19T22:53:03.402Z',
        cpf: '36391181896',
        phone: '5583988939542',
        address: accountAddressMock,
    },

    {
        _id: '63c9c9cfc0c3ad8ecc9157e8',
        name: 'Nelson Henrique da Paz',
        email: 'nelsonpaz@email.com',
        password: '4cab2a2db6a3c31b01d804def28276e6',
        createdDate: '2023-01-19T22:53:03.402Z',
        cpf: '35751722264"',
        phone: '5532981820900',
        address: accountAddressMock,
    },
];

export { accountAddressMock, allAccountsMock };