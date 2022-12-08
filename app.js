const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '638c6e180b2aa81e91a31f6f',
  };

  next();
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Некорректный путь',
  });
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT);
});
