/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Product from '../../../src/models/Product.js';
import Category from '../../../src/models/Category.js';
import { productToBeCreatedMock, productWithoutCategoryMock } from '../../../mocks/productsMocks.js';

describe('POST /admin/products', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn({}, 'save');
            mockingoose(Category).toReturn({}, 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return the created product with status 201', async () => {
            const response = await request(app)
                .post('/admin/products')
                .set('Accept', 'application/json')
                .send(productToBeCreatedMock)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('product');
            expect(response.body).toHaveProperty('description');
            expect(response.body).toHaveProperty('slug');
            expect(response.body).toHaveProperty('unitPrice');
            expect(response.body).toHaveProperty('quantity');
            expect(response.body).toHaveProperty('category');
        });
    });

    describe('Case it fails in creating a new product', () => {
        beforeEach(() => {
            mockingoose(Product).toReturn(new Error(), 'save');
            mockingoose(Category).toReturn({}, 'findOne');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .post('/admin/products')
                .set('Accept', 'application/json')
                .send(productToBeCreatedMock)
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });

    describe('Case it fails in middleware validations', () => {
        describe('Category validations', () => {
            beforeEach(() => {
                mockingoose(Category).toReturn(null, 'findOne');
            });
            
            afterEach(() => {
                mockingoose.resetAll();
            });

            it('should return an error message with status 400 when the category field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send(productWithoutCategoryMock)
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"category" is required');
            });

            it('should return an error message with status 400 when the category "name" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ ...productToBeCreatedMock, category: { categoryId: '63c9c0' } })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('category "name" is required');
            });

            it('should return an error message with status 400 when the "categoryId" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ ...productToBeCreatedMock, category: { name: '63c9c0' } })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"categoryId" is required');
            });
        });

        describe('Product validations', () => {
            it('should return an error message with status 400 when the "product" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"product" is required');
            });

            it('should return an error message with status 422 when the "product" length is under 4', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abc' })
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"product" length must be at least 4 characters long');
            });

            it('should return an error message with status 422 when the "product" field starts with a number', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: '1abcd' })
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"product" must not start with a number');
            });

            it('should return an error message with status 400 when the "description" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde' })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"description" is required');
            });

            it('should return an error message with status 400 when the "slug" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc' })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"slug" is required');
            });

            it('should return an error message with status 422 when the "slug" field has special letters', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc', slug: '@-@' })
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"slug" must only have letters, numbers and hyphens');
            });

            it('should return an error message with status 400 when the "unitPrice" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc', slug: 'abc' })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"unitPrice" is required');
            });

            it('should return an error message with status 422 when the "unitPrice" lower than 0', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc', slug: 'abc', unitPrice: -1 })
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"unitPrice" must be higher than 0');
            });

            it('should return an error message with status 400 when the "quantity" field is missing', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc', slug: 'abc', unitPrice: 2 })
                    .expect('content-type', /json/)
                    .expect(400);
                
                expect(response.body.message).toBe('"quantity" is required');
            });

            it('should return an error message with status 422 when the "quantity" field is lower than 0', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc', slug: 'abc', unitPrice: 2, quantity: -1 })
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"quantity" must be higher than 0');
            });

            it('should return an error message with status 422 when the "quantity" field is higher than 10000', async () => {
                const response = await request(app)
                    .post('/admin/products')
                    .set('Accept', 'application/json')
                    .send({ product: 'abcde', description: 'abc', slug: 'abc', unitPrice: 2, quantity: 10001 })
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"quantity" must be lower than 10000');
            });
        });
    });
});