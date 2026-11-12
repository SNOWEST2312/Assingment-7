DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews(
  id INTEGER PRIMARY KEY,
  reviewer TEXT NOT NULL,
  rating INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  CONSTRAINT rating_check CHECK (rating >= 1 AND rating<= 5)
);
