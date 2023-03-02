import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Product from '../../../src/models/Product.js';
import { allProductsMock } from '../../../mocks/productsMocks.js';

describe('GET /products', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn(allProductsMock, 'find');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an array with all products with status 200', async () => {
            const response = await request(app)
                .get('/products')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual(allProductsMock);
        });
    });

    describe('Case it does not find any product', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn([], 'find');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an empty array with status 200', async () => {
            const response = await request(app)
                .get('/products')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(typeof (response.body)).toBe('object');
            expect(response.body).toHaveLength(0);
        });
    });
});