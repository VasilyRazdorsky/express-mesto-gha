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
    if (error.name === 'TypeError') {
      return res.status(400).json({
        message: 'Некорректный id',
      });
    }
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
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Некорректные данные при создании пользователя',
      });
    }
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const id = req.user._id;

    const user = await User.findByIdAndUpdate(id, { name, about }, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Некорректные данные при обновлении пользователя',
      });
    }
    if (error.name === 'TypeError') {
      return res.status(404).json({
        message: 'Некорректный id',
      });
    }
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Некорректные данные',
      });
    }
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
