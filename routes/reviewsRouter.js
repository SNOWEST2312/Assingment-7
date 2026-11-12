import express from 'express';
import { postReview, getReviewDetails } from '../controllers/reviewsController.js';

const router = express.Router();

router.post('/', postReview);
router.get('/:id', getReviewDetails);

export default router;
