import database from '../databases/db.js';

export function getBooks(format, offset) {
  const statement = database.prepare(
    'SELECT id, isbn, title, format, year FROM books WHERE format = ? LIMIT 10 OFFSET ?'
  );

  return statement.all(format, offset);
}

export function getBookById(id) {
  const statement = database.prepare(`
    SELECT books.*, publishers.publisher
    FROM books
    JOIN publishers ON books.publisher_id = publishers.id
    WHERE books.id = ?
  `);

  return statement.get(id);
}
  