import express from 'express';
import { getBookDetails, getBookList } from '../controllers/booksController.js';

const router = express.Router();

router.get('/books', getBookList);
router.get('/books/:id', getBookDetails);

export default router;
