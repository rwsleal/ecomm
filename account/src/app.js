import express from 'express';
import db from './database/config/mongodbConnection.js';
import { errorHandler } from './middlewares/index.js';

db.once('open', () => {
    console.log('MongoDB succesfully connected!');
});

const app = express();

app.use(express.json());


app.use(errorHandler);

export default app;