const Card = require('../models/card');
const { errorTexts, httpAnswerCodes } = require('../constants');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const ValidationError = require('../errors/ValidationError');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

    return res.status(httpAnswerCodes.validOperationCode).json(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(httpAnswerCodes.validCreationCode).json(card);
  } catch (error) {
    let err = error;
    if (error.name === 'ValidationError') {
      err = new ValidationError(errorTexts.incorrectData);
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError(errorTexts.cardNotFound);
    }

    if (card.owner.equals(req.user._id.toString())) {
      const deletedCard = await Card.findByIdAndDelete(card._id);
      return res.status(httpAnswerCodes.validOperationCode).json(deletedCard);
    }

    throw new AccessError(errorTexts.cardAccessError);
  } catch(err) {
    let error = err;
    if (err.name === 'CastError') {
      error = new IncorrectDataError(errorTexts.incorrectId);
    }
    next(error);
  }

}

const addLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError(errorTexts.cardNotFound);
    }

    return res.status(httpAnswerCodes.validOperationCode).json(card);
  } catch (error) {
    let err = error
    if (error.name === 'CastError') {
      err = new IncorrectDataError(errorTexts.incorrectId);
    }
    next(err);
  }
};

const deleteLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError(errorTexts.cardNotFound);
    }

    return res.status(httpAnswerCodes.validOperationCode).json(card);
  } catch (error) {
    let err = error
    if (error.name === 'CastError') {
      err = new IncorrectDataError(errorTexts.incorrectId);
    }
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
