import express from 'express';
import { categoriesController } from '../controllers/index.js';
import { validationHandler } from '../middlewares/index.js';
import { categorySchema } from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();
const adminEndpointById = '/admin/categories/:id';

router
    .post('/admin/categories', validationHandler(categorySchema), categoriesController.create)
    .get('/categories/:id', categoriesController.getById)
    .put(adminEndpointById, categoriesController.update)
    .patch(adminEndpointById, categoriesController.update)
    .delete(adminEndpointById, categoriesController.remove);

export default router;