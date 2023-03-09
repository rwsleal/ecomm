/* eslint-disable mocha/no-mocha-arrows */
const request = require('supertest');
const app = require('../../../src/app.js');
const { Payments } = require('../../../src/models/index.js');
const { paymentReturnMock } = require('../../mocks/paymentsMocks.js');

describe('GET /payments/:id', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'findOne').mockResolvedValue(paymentReturnMock);
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return a payment object with status 200', async () => {
            const response = await request(app)
                .get('/payments/1')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual(paymentReturnMock);
        });
    });

    describe('Case it does not find the specified payment', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'findOne').mockResolvedValue(null);
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return nothing with status 200', async () => {
            const response = await request(app)
                .get('/payments/1')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);

            expect(response.body).toStrictEqual({});
        });
    });
});