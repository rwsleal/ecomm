const paymentMock = {
    id: 1,
    value: '31',
    cardName: 'Test Person',
    cardNumber: '5376781735134918',
    expirationDate: '2026-02',
    status: 'CONFIRMED',
};

const createdAndUpdatedMock = {
    createdAt: '2023-02-10T00:50:09.000Z',
    updatedAt: '2023-02-10T20:29:54.000Z',
};

const paymentReturnMock = { ...paymentMock, ...createdAndUpdatedMock };

module.exports = { paymentMock, createdAndUpdatedMock, paymentReturnMock };