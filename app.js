const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { urlPattern, errorTexts } = require('./constants');
const IncorrectRouteError = require('./errors/IncorrectRouteError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

// роуты, не требующие авторизации
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// Авторизация
app.use(auth);

// роуты, требующие авторизацию
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', () => {
  throw new IncorrectRouteError(errorTexts.incorrectRouteError);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT);
});
