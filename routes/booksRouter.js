import express from 'express';
import { getBookDetails, getBooksList } from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getBooksList);
router.get('/:id', getBookDetails);

export default router;
