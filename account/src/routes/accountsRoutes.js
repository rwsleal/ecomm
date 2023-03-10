import express from 'express';
import passport from 'passport';
import accountsController from '../controllers/index.js';
import validationHandler from '../middlewares/validationHandler.js';
import accountsSchema from '../joiSchemas/index.js';

import 'express-async-errors';

const router = express.Router();
const adminEndpointById = '/admin/accounts/:id';

const localAuthenticate = passport.authenticate('local', { session: false });
const bearerAuthenticate = passport.authenticate('bearer', { session: false });

router
    .post(
        '/accounts/login',
        localAuthenticate,
        accountsController.login,
    )
    .get(
        '/accounts/logout',
        bearerAuthenticate,
        accountsController.logout,
    )
    .get(
        '/admin/accounts',
        bearerAuthenticate,
        accountsController.getAll,
    )
    .get(
        adminEndpointById,
        accountsController.getById,
    )
    .post(
        '/admin/accounts',
        validationHandler(accountsSchema),
        accountsController.create,
    )
    .put(
        adminEndpointById,
        bearerAuthenticate,
        validationHandler(accountsSchema),
        accountsController.update,
    )
    .delete(
        adminEndpointById,
        bearerAuthenticate,
        accountsController.remove,
    );
export default router;