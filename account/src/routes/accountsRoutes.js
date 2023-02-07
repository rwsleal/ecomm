import express from 'express';
import accountsController from '../controllers/index.js';

import 'express-async-errors';

const router = express.Router();

router
    .get('/admin/accounts', accountsController.getAll);

export default router;