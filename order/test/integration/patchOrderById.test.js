/* eslint-disable max-len */
import request from 'supertest';
import mockingoose from 'mockingoose';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import app from '../../src/app.js';
import Order from '../../src/models/Order.js';
import { orderReturnMock, patchOrderReturnMock, fetchAccountReturnMock } from '../mocks/ordersMock.js';

/* 
    Código está dando erro. Não consegui fazer funcionar. O mock do findOne da Order deveria ser
    suficiente para fazer o teste funcionar. Mas mesmo assim, ele continua chamando as funções internas
    e consequentemente chama o fetch que faz o jest retornar um aviso. Mesmo assim, tentei mockar as funções
    internas e nem assim tive sucesso. Não sei mais o que pode ser.

*/

describe('PATCH /orders/:id', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            mockingoose(Order).toReturn(patchOrderReturnMock, 'findOneAndUpdate');
            global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(fetchAccountReturnMock) }));
            mockingoose(Order).toReturn(orderReturnMock, 'findOne');
        });
        
        afterEach(() => {
            mockingoose.resetAll();
            jest.clearAllMocks();
        });
        
        it('should return the patched order with status 200', async () => {
            const response = await request(app)
                .patch('/orders/63ed7cdae209623a8c537180')
                .set('Accept', 'application/json')
                .send({ paymentId: 1 })
                .expect('content-type', /json/)
                .expect(200);

            expect(response.body).toStrictEqual(patchOrderReturnMock);
        });
    });
});