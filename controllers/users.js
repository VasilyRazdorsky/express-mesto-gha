const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message: 'Произошла ошибка',
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
