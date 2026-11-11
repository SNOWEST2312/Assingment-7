import express from 'express';
import database from './databases/db.js';
import apiRouter from './routes/index';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api/v1', apiRouter);

app.get('/api/v1/books', (request, response) => {
  const format = request.query.format || 'hardcover';
  const page = Math.max(Number.parseInt(request.query.page || '0', 10) || 0, 0);
  const offset = page * 10;

  database.all(
    'SELECT id, isbn, title, format, year FROM books WHERE format = ? LIMIT 10 OFFSET ?',
    [format, offset],
    (error, books) => {
      if (error) {
        response.status(500).json({ error: 'Unable to fetch books' });
        return;
      }

      response.json(books);
    }
  );
});

app.get('/api/v1/books/:isbn', (request, response) => {
  const { isbn } = request.params;

  database.get('SELECT * FROM books WHERE isbn = ?', [isbn], (bookError, book) => {
    if (bookError) {
      response.status(500).json({ error: 'Unable to fetch book' });
      return;
    }

    if (!book) {
      response.status(404).json({ error: 'Book not found' });
      return;
    }

    database.get(
      'SELECT publisher FROM publishers WHERE id = ?',
      [book.publisher_id],
      (publisherError, publisher) => {
        if (publisherError) {
          response.status(500).json({ error: 'Unable to fetch publisher' });
          return;
        }

        book.publisher = publisher?.publisher;

        database.all(
          'SELECT rating FROM ratings WHERE book_id = ?',
          [book.id],
          (ratingsError, ratings) => {
            if (ratingsError) {
              response.status(500).json({ error: 'Unable to fetch ratings' });
              return;
            }

            let ratingTotal = 0;
            ratings.forEach((rating) => {
              ratingTotal += rating.rating;
            });
            book.average_rating = ratings.length ? ratingTotal / ratings.length : 0;

            response.json(book);
          }
        );
      }
    );
  });
});

app.post('/api/v1/ratings', (request, response) => {
  const { book_id: bookId, rating } = request.body;
  const parsedBookId = Number(bookId);
  const parsedRating = Number(rating);

  if (
    !Number.isInteger(parsedBookId) ||
    parsedBookId < 1 ||
    !Number.isInteger(parsedRating) ||
    parsedRating < 0 ||
    parsedRating > 5
  ) {
    response.status(400).json({ error: 'book_id and rating are invalid' });
    return;
  }

  database.run(
    'INSERT INTO ratings (book_id, rating) VALUES (?, ?)',
    [parsedBookId, parsedRating],
    (error) => {
      if (error) {
        response.status(500).json({ error: 'Unable to save rating' });
        return;
      }

      response.status(201).json({ message: 'Rating saved' });
    }
  );
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
