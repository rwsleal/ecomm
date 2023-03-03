import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import mockingoose from 'mockingoose';
import app from '../../../src/app.js';
import Account from '../../../src/models/Account.js';
import { allAccountsMock } from '../../mocks/accountsMocks.js';

describe('GET /admin/accounts/:id', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn(allAccountsMock[0], 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an account object with status 200', async () => {
            const response = await request(app)
                .get('/admin/accounts/63c9c9cfc0c3ad8ecc9157e7')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual(allAccountsMock[0]);
        });
    });

    describe('Case it does not find the specified account', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn(new Error(), 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .get('/admin/accounts/63c9c9cfc')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
                expect(response.body.message).toBe('Something went wrong');
        });
    });
});