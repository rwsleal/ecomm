import express from 'express';
import passport from 'passport';
import { productsController } from '../controllers/index.js';
import { validationHandler, categoryCheck } from '../middlewares/index.js';
import { productSchema } from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();
const bearerAuthenticate = passport.authenticate('bearer', { session: false });

router
    .get(
        '/products',
        productsController.getAll,
        )
    .get(
        '/products/:id',
        productsController.getById,
        )
    .put(
        '/admin/products/:id',
        bearerAuthenticate,
        productsController.update,
        )
    .delete(
        '/admin/products/:id',
        bearerAuthenticate,
        productsController.remove,
        )
    .post(
        '/admin/products',
        bearerAuthenticate,
        validationHandler(productSchema),
        categoryCheck,
        productsController.create,
        );

export default router;