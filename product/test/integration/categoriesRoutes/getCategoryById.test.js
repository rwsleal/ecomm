import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Category from '../../../src/models/Category.js';
import { categoryMock } from '../../../mocks/categoriesMocks.js';

describe('GET /categories/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn(categoryMock, 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an object with a category with status 200', async () => {
            const response = await request(app)
                .get('/categories/63c9c09806ffd20fd4bdea6c')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual(categoryMock);
        });
    });

    describe('Case it does not find the specified category', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn(new Error(), 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .get('/categories/63c9c09806ffd20fd4bdea6c')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});