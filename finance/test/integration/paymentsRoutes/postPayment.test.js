/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/* eslint-disable mocha/no-mocha-arrows */
const request = require('supertest');
const app = require('../../../src/app.js');
const { Payments } = require('../../../src/models/index.js');
const { paymentMock } = require('../../mocks/paymentsMocks.js');

describe('POST /payments', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'create').mockResolvedValue({ id: 1, status: 'CREATED' });
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return the created payment object with status 201', async () => {
            const response = await request(app)
                .post('/payments')
                .set('Accept', 'application/json')
                .send(paymentMock)
                .expect('content-type', /json/)
                .expect(201);
            
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('status');
        });
    });

    describe('Case it fails in creating a new payment', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'create').mockImplementation(() => {
                throw new Error();
            });
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .post('/payments')
                .set('Accept', 'application/json')
                .send(paymentMock)
                .expect('content-type', /json/)
                .expect(500);

            expect(response.body.message).toBe('Something went wrong');
        });
    });
});