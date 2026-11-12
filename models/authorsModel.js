import database from '../databases/db.js';

export function getAllAuthors() {
  const statement = database.prepare('SELECT * FROM authors');
  return statement.all();
}

export function getAuthorById(id) {
  const statement = database.prepare('SELECT * FROM authors WHERE id = ?');
  return statement.get(id);
}

export function getBooksByAuthorId(authorId) {
  const statement = database.prepare(`
    SELECT books.id, books.title
    FROM books
    JOIN authored ON books.id = authored.book_id
    WHERE authored.author_id = ?
  `);

  return statement.all(authorId);
}
