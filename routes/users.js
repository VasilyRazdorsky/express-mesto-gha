const usersRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

// GET /users
usersRouter.get('/', getUsers);

// GET /users/:userId
usersRouter.get('/:userId', getUser);


// POST /users
usersRouter.post('/', createUser);

// PATCH /users/me
usersRouter.patch('/me', updateProfile);


// PATCH /users/avatar
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
