/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable mocha/max-top-level-suites */
/* eslint-disable mocha/no-mocha-arrows */
import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../src/app.js';
import Product from '../../src/models/Product.js';
import { allProductsMock } from '../../mocks/productsMocks.js';

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

describe('GET /products/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn(allProductsMock[0], 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an object with a product with status 200', async () => {
            const response = await request(app)
                .get('/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual(allProductsMock[0]);
        });
    });

    describe('Case it does not find the specified product', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn(new Error(), 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .get('/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});

describe('PUT /admin/products/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn({}, 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should a message with status 200', async () => {
            const response = await request(app)
                .put('/admin/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .send({})
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body.message).toBe('product successfully updated');
        });
    });

    describe('Case it does not find the specified product', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn(new Error(), 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .put('/admin/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .send({})
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});