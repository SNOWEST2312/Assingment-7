import database from '../database.js';

export function getAllAuthors(callback) {
  database.all('SELECT * FROM authors', callback);
}
