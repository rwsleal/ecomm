/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */
import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import app from '../../../src/app.js';
import Category from '../../../src/models/Category.js';
import { postCategoryMock } from '../../../mocks/categoriesMocks.js';

describe('POST /admin/categories', () => {
    describe('Case it succeceds', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn({}, 'save');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return the created category with status 201', async () => {
            const response = await request(app)
                .post('/admin/categories')
                .set('Accept', 'application/json')
                .send(postCategoryMock)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('status');
        });
    });

    describe('Case it fails in creating a new product', () => {
        beforeEach(() => {
            mockingoose(Category).toReturn(new Error(), 'save');
        });
    
        afterEach(() => {
            mockingoose.resetAll();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .post('/admin/categories')
                .set('Accept', 'application/json')
                .send(postCategoryMock)
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });

    describe('Categories validations', () => {
        it('should return an error message with status 400 when the "name" field is missing', async () => {
            const response = await request(app)
                .post('/admin/categories')
                .set('Accept', 'application/json')
                .send({ status: 'ATIVA' })
                .expect('content-type', /json/)
                .expect(400);
            
            expect(response.body.message).toBe('"name" is required');
        });

        it('should return an error message with status 422 when the "name" field length is under 4', async () => {
            const response = await request(app)
                .post('/admin/categories')
                .set('Accept', 'application/json')
                .send({ name: 'abc' })
                .expect('content-type', /json/)
                .expect(422);
            
            expect(response.body.message).toBe('"name" length must be at least 4 characters long');
        });

        it('should return an error message with status 422 when the "name" field starts with a number', async () => {
            const response = await request(app)
                .post('/admin/categories')
                .set('Accept', 'application/json')
                .send({ name: '1abcd' })
                .expect('content-type', /json/)
                .expect(422);
            
            expect(response.body.message).toBe('"name" must not start with a number');
        });

        it('should return an error message with status 422 when the "status" field has a value different from "ATIVA" or "INATIVA"', async () => {
            const response = await request(app)
                .post('/admin/categories')
                .set('Accept', 'application/json')
                .send({ name: 'abcde', status: 'TEST' })
                .expect('content-type', /json/)
                .expect(422);
            
            expect(response.body.message).toBe('"status" must be only "ATIVO" or "INATIVO"');
        });
    });
});
