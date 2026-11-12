import database from '../databases/db.js';

export function createReview(reviewer, rating, bookId, comment) {
  const statement = database.prepare(`
    INSERT INTO reviews (reviewer, rating, book_id, comment)
    VALUES (?, ?, ?, ?)
  `);

  const result = statement.run(reviewer, rating, bookId, comment);

  return result.lastInsertRowid;
}

export function getReviewById(id) {
  const statement = database.prepare('SELECT * FROM reviews WHERE id = ?');

  return statement.get(id);
}
