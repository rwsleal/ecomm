import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import mockingoose from 'mockingoose';
import app from '../../../src/app.js';
import Account from '../../../src/models/Account.js';
import { accountToBeCreated } from '../../mocks/accountsMocks.js';

describe('PUT /admin/accounts/:id', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn({}, 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return a message with status 200', async () => {
            const response = await request(app)
                .put('/admin/accounts/63c9c9cf')
                .set('Accept', 'application/json')
                .send(accountToBeCreated)
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body.message).toBe('Account successfully updated');
        });
    });

    describe('Case it does not find the specified account', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn(new Error(), 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .put('/admin/accounts/63c9c9cf')
                .set('Accept', 'application/json')
                .send(accountToBeCreated)
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});