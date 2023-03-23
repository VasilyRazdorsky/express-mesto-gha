const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

// GET /users
usersRouter.get('/', getUsers);

// GET /users/me
usersRouter.get('/me', getCurrentUser);

// GET /users/:userId
usersRouter.get('/:userId', getUser);

// PATCH /users/me
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

// PATCH /users/me/avatar
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/i),
  }),
}), updateAvatar);

module.exports = usersRouter;
