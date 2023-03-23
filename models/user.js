const mongoose = require('mongoose');
const validator = require('validator');
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: [isURL, 'Некорректный URL'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле "email" должно быть валидным email-адресом.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
