import { getAllAuthors, getAuthorById, getBooksByAuthorId } from '../models/authorsModel.js';
export function getAuthors(request, response) {
  try {
    const authors = getAllAuthors();
    response.json(authors);
  } catch (error) {
    response.status(500).json({
      error: 'Unable to fetch authors',
    });
  }
}

export function getAuthorDetails(request, response) {
  try {
    const { id } = request.params;
    const author = getAuthorById(id);

    if (!author) {
      response.status(404).json({
        error: 'Author not found',
      });
      return;
    }

    const books = getBooksByAuthorId(id).map((book) => ({
      id: book.id,
      title: book.title,
      link: `/api/v1/books/${book.id}`,
    }));

    response.json({
      ...author,
      books,
    });
  } catch (error) {
    response.status(500).json({
      error: 'Unable to retrieve author details',
    });
  }
}
