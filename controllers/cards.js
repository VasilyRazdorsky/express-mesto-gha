const Card = require('../models/card');
const errorTexts = require('../constants');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    cards.populate(['owner', 'likes']);
    return res.status(200).json(cards);
  } catch (err) {
    return res.status(500).json({
      message: errorTexts.baseError,
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
        message: errorTexts.incorrectData,
      });
    }
    return res.status(500).json({
      message: errorTexts.baseError,
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({
        message: errorTexts.cardNotFound,
      });
    }
    return res.status(200).json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: errorTexts.incorrectId,
      });
    }
    return res.status(500).json({
      message: errorTexts.baseError,
    });
  }
};

const addLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true });

    card.populate(['owner', 'likes']);

    if (!card) {
      return res.status(404).json({
        message: errorTexts.cardNotFound,
      });
    }

    return res.status(200).json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: errorTexts.incorrectId,
      });
    }
    return res.status(500).json({
      message: errorTexts.baseError,
    });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, {
      $pull: { likes: req.user._id },
    }, { new: true });

    card.populate(['owner', 'likes']);

    if (!card) {
      return res.status(404).json({
        message: errorTexts.cardNotFound,
      });
    }

    return res.status(200).json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: errorTexts.incorrectId,
      });
    }
    return res.status(500).json({
      message: errorTexts.baseError,
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
