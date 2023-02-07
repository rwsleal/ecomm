import express from 'express';
import { productsController } from '../controllers/index.js';
import { validationHandler, categoryCheck } from '../middlewares/index.js';
import { productSchema } from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();
// const adminEndpointById = '/admin/categories/:id';

router
    .get('/products', productsController.getAll)
    .get('/products/:id', productsController.getById)
    .post(
        '/admin/products',
        validationHandler(productSchema),
        categoryCheck,
        productsController.create,
        );

export default router;