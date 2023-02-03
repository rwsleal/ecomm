import express from 'express';
import { categoriesController } from '../controllers/index.js';

const router = express.Router();

router
    .post('/admin/categories', categoriesController.create);

export default router;