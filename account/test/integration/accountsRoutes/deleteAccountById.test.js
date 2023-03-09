import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import mockingoose from 'mockingoose';
import app from '../../../src/app.js';
import Account from '../../../src/models/Account.js';

describe('DELETE /admin/accounts/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn({}, 'findOneAndRemove');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return no content with status 204', async () => {
            await request(app)
                .delete('/admin/accounts/63c9c3')
                .set('Accept', 'application/json')
                .expect(204);
        });
    });

    describe('Case it does not find the specified account', () => {
        beforeEach(() => {
            mockingoose(Account).toReturn(new Error(), 'findOneAndRemove');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .delete('/admin/accounts/63c9c3')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});