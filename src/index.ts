import express from 'express';

const PORT = 3000;

const app = express();

app.get('/', (_, res) => {
  res.status(204).end();
});

app.listen(PORT, () => console.log('listening on port', PORT));
