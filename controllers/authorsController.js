import { getAllAuthors } from '../models/authorsModel.js';

export function getAuthors(request, response) {
  getAllAuthors((error, authors) => {
    if (error) {
      response.status(500).json({ error: 'Unable to fetch authors' });
      return;
    }
    response.json({ authors });
  });
}
