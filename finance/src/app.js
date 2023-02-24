const express = require('express');
const { errorHandler } = require('./middlewares/index.js');
const paymentsRoutes = require('./routes/index.js');

const app = express();

app.use(express.json());

app.use(paymentsRoutes);
app.use(errorHandler);

module.exports = app;