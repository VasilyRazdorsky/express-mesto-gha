const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (err) {
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const createCard = async (req, res) => {
  try {
    const { body } = req;
    body.owner = req.user._id;

    const card = await Card.create(body);

    return res.status(201).json(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Некорректные данные при создании карточки',
      });
    }
    return res.status(500).json({
      message: 'Произошла ошибка',
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({
        message: 'Карточка не найдена',
      });
    }
    return res.status(200).json(card);
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

const addLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true });

    if (!card) {
      return res.status(404).json({
        message: 'Карточка не найдена',
      });
    }

    return res.status(200).json(card);
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

const deleteLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, {
      $pull: { likes: req.user._id },
    }, { new: true });

    if (!card) {
      return res.status(404).json({
        message: 'Карточка не найдена',
      });
    }

    return res.status(200).json(card);
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
