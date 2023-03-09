import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Category from '../../../src/models/Category.js';

describe('DELETE /admin/categories/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn({}, 'findOneAndRemove');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return no content with status 204', async () => {
            await request(app)
                .delete('/admin/categories/63c9c09806ffd20fd4bdea6c')
                .set('Accept', 'application/json')
                .expect(204);
        });
    });

    describe('Case it does not find the specified product', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn(new Error(), 'findOneAndRemove');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .delete('/admin/categories/63c9c09806ffd20fd4bdea6c')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});