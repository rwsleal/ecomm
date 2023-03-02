import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Category from '../../../src/models/Category.js';

describe('PUT /admin/categories/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn({}, 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return a message with status 200', async () => {
            const response = await request(app)
                .put('/admin/categories/63c9c09806ffd20fd4bdea6c')
                .set('Accept', 'application/json')
                .send({ status: 'ATIVA' })
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body.message).toBe('Category successfully updated');
        });
    });

    describe('Case it does not find the specified category', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn(new Error(), 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .put('/admin/categories/63c9c09806ffd20fd4bdea6c')
                .set('Accept', 'application/json')
                .send({})
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});