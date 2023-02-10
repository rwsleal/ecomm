const express = require('express');
const paymentsController = require('../controllers/index.js');

require('express-async-errors');

const router = express.Router();

router
    .get('/payments/:id', paymentsController.getById)
    .patch('/payments/:id', paymentsController.updateStatus)
    .post('/payments', paymentsController.create);

module.exports = router;