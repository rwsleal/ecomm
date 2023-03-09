import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import mockingoose from 'mockingoose';
import app from '../../../src/app.js';
import Account from '../../../src/models/Account.js';
import { accountToBeCreated } from '../../mocks/accountsMocks.js';

describe('POST /admin/accounts/', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn({}, 'save');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return the created account with status 201', async () => {
            const response = await request(app)
                .post('/admin/accounts/')
                .set('Accept', 'application/json')
                .send(accountToBeCreated)
                .expect('content-type', /json/)
                .expect(201);
            
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('password');
            expect(response.body).toHaveProperty('cpf');
            expect(response.body).toHaveProperty('phone');
            expect(response.body).toHaveProperty('address');
        });
    });

    describe('Case it fails in creating a new account', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn(new Error(), 'save');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .post('/admin/accounts')
                .set('Accept', 'application/json')
                .send(accountToBeCreated)
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});