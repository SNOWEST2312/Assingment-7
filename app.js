import express from 'express';
import database from './databases/db.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api/v1', apiRouter);

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
