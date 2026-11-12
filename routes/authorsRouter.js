import express from 'express';
import { getAuthors, getAuthorDetails } from '../controllers/authorsController.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorDetails);

export default router;
