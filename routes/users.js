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
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// PATCH /users/me/avatar
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
