import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import mockingoose from 'mockingoose';
import app from '../../../src/app.js';
import Account from '../../../src/models/Account.js';
import { allAccountsMock } from '../../mocks/accountsMocks.js';

describe('GET /admin/accounts', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn(allAccountsMock, 'find');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an array with all accounts with status 200', async () => {
            const response = await request(app)
                .get('/admin/accounts')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual(allAccountsMock);
        });
    });

    describe('Case it does not find any account', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn([], 'find');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an empty array with status 200', async () => {
            const response = await request(app)
                .get('/admin/accounts')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(typeof (response.body)).toBe('object');
            expect(response.body).toHaveLength(0);
        });
    });
});