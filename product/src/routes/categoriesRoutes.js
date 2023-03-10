import express from 'express';
import passport from 'passport';
import { categoriesController } from '../controllers/index.js';
import { validationHandler } from '../middlewares/index.js';
import { categorySchema } from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();
const bearerAuthenticate = passport.authenticate('bearer', { session: false });

const adminEndpointById = '/admin/categories/:id';

router
    .post(
        '/admin/categories',
        bearerAuthenticate,
        validationHandler(categorySchema),
        categoriesController.create,
        )
    .get(
        '/categories/:id',
        categoriesController.getById,
        )
    .put(
        adminEndpointById,
        bearerAuthenticate,
        categoriesController.update,
        )
    .patch(
        adminEndpointById,
        bearerAuthenticate,
        categoriesController.update,
        )
    .delete(
        adminEndpointById,
        bearerAuthenticate,
        categoriesController.remove,
        );

export default router;