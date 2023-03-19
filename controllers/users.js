const bcrypt = require('bcrypt');

const User = require('../models/user');
const { errorTexts, httpAnswerCodes } = require('../constants');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(httpAnswerCodes.validOperationCode).json(users);
  } catch (error) {
    return res.status(httpAnswerCodes.baseErrorCode).json({
      message: errorTexts.baseError,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(httpAnswerCodes.objNotFoundCode).json({
        message: errorTexts.userNotFound,
      });
    }

    return res.status(httpAnswerCodes.validOperationCode).json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(httpAnswerCodes.incorrectDataCode).json({
        message: errorTexts.incorrectId,
      });
    }
    return res.status(httpAnswerCodes.baseErrorCode).json({
      message: errorTexts.baseError,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });

    return res.status(httpAnswerCodes.validCreationCode).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(httpAnswerCodes.incorrectDataCode).json({
        message: errorTexts.incorrectData,
      });
    }
    if (error.code === 11000) {
      return res.status(httpAnswerCodes.duplicateErrorCode).json({
        message: errorTexts.alreadyRegisteredError,
      });
    }
    return res.status(httpAnswerCodes.baseErrorCode).json({
      message: errorTexts.baseError,
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
    if (!user) {
      return res.status(httpAnswerCodes.objNotFoundCode).json({
        message: errorTexts.userNotFound,
      });
    }
    return res.status(httpAnswerCodes.validOperationCode).json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(httpAnswerCodes.incorrectDataCode).json({
        message: errorTexts.incorrectId,
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(httpAnswerCodes.incorrectDataCode).json({
        message: errorTexts.incorrectData,
      });
    }
    return res.status(httpAnswerCodes.baseErrorCode).json({
      message: errorTexts.baseError,
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
      return res.status(httpAnswerCodes.objNotFoundCode).json({
        message: errorTexts.userNotFound,
      });
    }
    return res.status(httpAnswerCodes.validOperationCode).json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(httpAnswerCodes.incorrectDataCode).json({
        message: errorTexts.incorrectId,
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(httpAnswerCodes.incorrectDataCode).json({
        message: errorTexts.incorrectData,
      });
    }
    return res.status(httpAnswerCodes.baseErrorCode).json({
      message: errorTexts.baseError,
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
