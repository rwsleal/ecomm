const express = require('express');
const passport = require('passport');
const paymentsController = require('../controllers/index.js');

require('express-async-errors');

const router = express.Router();
const bearerAuthenticate = passport.authenticate('bearer', { session: false });

router
    .get('/payments/:id', bearerAuthenticate, paymentsController.getById)
    .patch('/payments/:id', bearerAuthenticate, paymentsController.updateStatus)
    .post('/payments', bearerAuthenticate, paymentsController.create);

module.exports = router;