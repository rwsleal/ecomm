import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Product from '../../../src/models/Product.js';

describe('DELETE /admin/products/:id', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn({}, 'findOneAndRemove');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return no content with status 204', async () => {
            await request(app)
                .delete('/admin/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .expect(204);
        });
    });

    describe('Case it does not find the specified product', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn(new Error(), 'findOneAndRemove');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .delete('/admin/products/63c9c3f8db66202eaf4f556d')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});