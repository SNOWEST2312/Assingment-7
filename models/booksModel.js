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

export function getAuthorsByBookId(bookId) {
  const statement = database.prepare(`
    SELECT authors.id, authors.name
    FROM authors
    JOIN authored ON authors.id = authored.author_id
    WHERE authored.book_id = ?
  `);

  return statement.all(bookId);
}
