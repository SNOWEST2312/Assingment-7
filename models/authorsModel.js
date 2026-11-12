import database from '../databases/db.js';

export function getAllAuthors() {
  const statement = database.prepare('SELECT * FROM authors');
  return statement.all();
}
