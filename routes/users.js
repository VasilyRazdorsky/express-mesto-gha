const usersRouter = require('express').Router();
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
usersRouter.patch('/me', updateProfile);

// PATCH /users/me/avatar
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
