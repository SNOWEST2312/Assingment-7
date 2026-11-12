import express from 'express';
import apiRouter from './routes/index.js';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api/v1', apiRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
