import database from '/databases/db.js';

export function getAllAuthors(callback) {
  database.all('SELECT * FROM authors', callback);
}
