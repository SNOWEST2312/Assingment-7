import database from '../databases/db.js';

export function getAllAuthors(callback) {
  const statement = database.prepare('SELECT * FROM authors');
  const authors = statement.all();
}
