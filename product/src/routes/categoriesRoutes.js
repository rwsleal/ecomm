import express from 'express';
import { categoriesController } from '../controllers/index.js';
import { validationHandler } from '../middlewares/index.js';
import { categorySchema } from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();

router
    .post('/admin/categories', validationHandler(categorySchema), categoriesController.create)
    .get('/categories/:id', categoriesController.getById)
    .put('/admin/categories/:id', categoriesController.update)
    .delete('/admin/categories/:id', categoriesController.remove);

export default router;