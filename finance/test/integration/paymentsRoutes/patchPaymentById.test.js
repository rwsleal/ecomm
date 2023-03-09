/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
/* eslint-disable mocha/no-mocha-arrows */
const request = require('supertest');
const app = require('../../../src/app.js');
const { Payments, sequelize } = require('../../../src/models/index.js');

describe('PATCH /payments/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'findOne').mockResolvedValue({ status: 'CREATED' });
            jest.spyOn(sequelize, 'transaction').mockResolvedValue();
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return a message with status 200', async () => {
            const response = await request(app)
                .patch('/payments/1')
                .set('Accept', 'application/json')
                .send({ status: 'CONFIRMED', description: 'description text' })
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body.message).toStrictEqual('Payment CONFIRMED');
        });
    });

    describe('Case it does not find the specified payment', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'findOne').mockResolvedValue(null);
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .patch('/payments/1')
                .set('Accept', 'application/json')
                .send({ status: 'CONFIRMED', description: 'description text' })
                .expect('content-type', /json/)
                .expect(500);

            expect(response.body.message).toBe('Something went wrong');
        });
    });

    describe('Payment validations', () => {
        beforeEach(() => {
            jest.spyOn(Payments, 'findOne').mockResolvedValue({ status: 'CONFIRMED' });
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return an error message with status 422 when "status" has an invalid value', async () => {
            const response = await request(app)
                .patch('/payments/1')
                .set('Accept', 'application/json')
                .send({ status: 'CONFIRMED', description: 'description text' })
                .expect('content-type', /json/)
                .expect(422);

            expect(response.body.message).toBe('"status" has an invalid value');
        });
    });
});