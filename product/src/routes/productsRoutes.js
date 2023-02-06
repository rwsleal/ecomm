import express from 'express';
import { productsController } from '../controllers/index.js';

import 'express-async-errors';

const router = express.Router();
// const adminEndpointById = '/admin/categories/:id';

router
    .get('/products', productsController.getAll);

export default router;