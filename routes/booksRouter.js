import express from 'express';
import { getBooksDetails, getBookList } from '../controllers/booksController.js';

const router = express.Router();

router.get('/books', getBookList);
router.get('/books/:id', getBooksDetails);

export default router;
