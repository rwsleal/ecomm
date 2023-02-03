import express from 'express';
import db from './database/config/mongodbConnection.js';

db.once('open', () => {
    console.log('MongoDB succesfully connected!');
});

const app = express();

app.use(express.json());

export default app;