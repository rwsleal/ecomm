import express from 'express';
import accountsController from '../controllers/index.js';
import validationHandler from '../middlewares/validationHandler.js';
import accountsSchema from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();

router
    .get('/admin/accounts', accountsController.getAll)
    .get('/admin/accounts/:id', accountsController.getById)
    .post('/admin/accounts', validationHandler(accountsSchema), accountsController.create);
export default router;