import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Product from '../../../src/models/Product.js';

describe('PUT /admin/products/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn({}, 'findOneAndUpdate');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return a message with status 200', async () => {
            const response = await request(app)
                .put('/admin/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .send({})
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body.message).toBe('Product successfully updated');
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