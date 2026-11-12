import { getAllAuthors } from '../models/authorsModel.js';

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
