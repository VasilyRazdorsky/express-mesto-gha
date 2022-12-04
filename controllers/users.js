const User = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  return res.status(200).send({
    getUser: true
  });
};

const createUser = async (req, res) => {
  return res.status(200).send({
    createUser: true
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser
};