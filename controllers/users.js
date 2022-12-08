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
    if(error.name = 'ValidationError') {
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

    if(name.length <= 30 && name.length >= 2 && about.length <= 30 && about.length >= 2){
      const id = req.user._id;
      const user = await User.findByIdAndUpdate(id, {name:name, about:about}, {new: true});

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }

      return res.status(201).json(user);
    } else {
      return res.status(400).json({
        message: 'Некорректные данные',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if(avatar){
      const id = req.user._id;

      const user = await User.findByIdAndUpdate(id, {avatar: avatar}, {new: true});

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }

      return res.status(201).json(user);
    } else {
      return res.status(400).json({
        message: 'Некорректные данные',
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
