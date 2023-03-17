import express from 'express';
import db from './database/config/mongodbConnection.js';
import { categoriesRoutes, productsRoutes } from './routes/index.js';
import { errorHandler } from './middlewares/index.js';
// eslint-disable-next-line no-unused-vars
import BearerStrategy from './middlewares/authStrategies.js';

db.once('open', () => {
    console.log('MongoDB succesfully connected!');
});

const app = express();

app.use(express.json());

app.use(categoriesRoutes);
app.use(productsRoutes);
app.use(errorHandler);

export default app;