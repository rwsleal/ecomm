import express from 'express';
import ordersController from '../controllers/index.js';

import 'express-async-errors';

const router = express.Router();

router
    .post('/orders', ordersController.create);
export default router;