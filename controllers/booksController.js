import { getBooksById, getBooks } from '../models/booksModel.js';

export function getBooksList(request, response) {
  try {
    const format = request.query.format || 'hardcover';
    const page = Math.max(Number.parseInt(request.query.page || '0', 10) || 0, 0);
    const offset = page * 10;
    const books = getBooks(format, offset);

    response.json(books);
  } catch (error) {
    response.status(500).json({
      error: 'Unable to retrieve books',
    });
  }
}

export function getBookDetails(request, response) {
  try {
    const { id } = request.params;
    const book = getBooksById(id);

    if (!book) {
      response.status(404).json({
        error: 'Book not found',
      });
      return;
    }

    response.json(book);
  } catch (error) {
    response.status(500).json({
      error: 'Unable to retrieve book details',
    });
  }
}
