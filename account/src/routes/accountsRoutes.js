import express from 'express';
import accountsController from '../controllers/index.js';
import validationHandler from '../middlewares/validationHandler.js';
import accountsSchema from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();
const adminEndpointById = '/admin/accounts/:id';

router
    .get('/admin/accounts', accountsController.getAll)
    .get(adminEndpointById, accountsController.getById)
    .post('/admin/accounts', validationHandler(accountsSchema), accountsController.create)
    .put(adminEndpointById, validationHandler(accountsSchema), accountsController.update)
    .delete(adminEndpointById, accountsController.remove);
export default router;