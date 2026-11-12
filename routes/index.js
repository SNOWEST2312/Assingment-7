import express from 'express';
import authorsRouter from './authorsRouter.js';
import booksRouter from './booksRouter.js';
import reviewsRouter from './reviewsRouter.js';

const router = express.Router();

router.use('/authors', authorsRouter);
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);

export default router;
