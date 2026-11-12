import { createReview, getReviewById } from '../models/reviewsModel.js';

export function postReview(request, response) {
  try {
    const { reviewer, rating, book_id: bookId, comment } = request.body;

    const reviewId = createReview(reviewer, rating, bookId, comment);

    const reviewPath = `/api/v1/reviews/${reviewId}`;

    response
      .status(201)
      .set('Location', reviewPath)
      .json({
        status: 201,
        message: 'Created',
        links: {
          by_review_id: reviewPath,
          by_book_id: `/api/v1/reviews?book_id=${bookId}`,
        },
        review: {
          reviewer,
          rating,
          book_id: bookId,
          comment,
        },
      });
  } catch (error) {
    response.status(500).json({
      error: 'Unable to create review',
    });
  }
}

export function getReviewDetails(request, response) {
  try {
    const { id } = request.params;
    const review = getReviewById(id);

    if (!review) {
      response.status(404).json({
        error: 'Review not found',
      });
      return;
    }

    response.json(review);
  } catch (error) {
    response.status(500).json({
      error: 'Unable to retrieve review',
    });
  }
}
