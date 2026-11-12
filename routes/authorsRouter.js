import express from 'express';
import { getAllAuthors } from '../models/authorsModel.js';

const router = express.Router();

router.get('/', getAuthors);

export default router;
