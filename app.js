const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '638c6e180b2aa81e91a31f6f',
  };

  next();
});

app.use('/users', router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT);
});
