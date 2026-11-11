import express from 'express';
import authorsRouter from './authorsRouter.js';
import booksRouter from './booksRouter.js';
import reviewsRouter from './reviewsRouter.js'

const router = express.Router();

router.use('/authors', authorsRouter);
router

export default router;
