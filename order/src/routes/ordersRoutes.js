import express from 'express';
import passport from 'passport';
import ordersController from '../controllers/index.js';

import 'express-async-errors';

const router = express.Router();
const bearerAuthenticate = passport.authenticate('bearer', { session: false });

router
    .post('/orders', bearerAuthenticate, ordersController.create)
    .patch('/orders/:id', bearerAuthenticate, ordersController.confirm);
export default router;