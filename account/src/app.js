/* eslint-disable no-unused-vars */
import express from 'express';
import db from './database/config/mongodbConnection.js';
import accountsRoutes from './routes/index.js';
import { errorHandler } from './middlewares/index.js';
import client from '../redis/blacklist.js';
import { LocalStrategy } from './middlewares/authStrategies.js';

db.once('open', () => {
    console.log('MongoDB succesfully connected!');
});

const app = express();

app.use(express.json());
app.use(accountsRoutes);

app.use(errorHandler);

export default app;