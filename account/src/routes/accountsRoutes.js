import express from 'express';
import accountsController from '../controllers/index.js';

import 'express-async-errors';

const router = express.Router();

router
    .get('/admin/accounts', accountsController.getAll)
    .get('/admin/accounts/:id', accountsController.getById);

export default router;