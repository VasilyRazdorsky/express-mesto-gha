const Card = require('../models/card');
const { errorTexts, httpAnswerCodes } = require('../constants');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

    return res.status(httpAnswerCodes.validOperationCode).json(cards);
  } catch (err) {
    return res.status(httpAnswerCodes.baseErrorCode).json({
      message: errorTexts.baseError,
    });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(httpAnswerCodes.validCreationCode).json(card);
  } catch (error) {
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

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(httpAnswerCodes.objNotFoundCode).json({
        message: errorTexts.cardNotFound,
      });
    }
    return res.status(httpAnswerCodes.validOperationCode).json(card);
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

const addLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true }).populate(['owner', 'likes']);

    if (!card) {
      return res.status(httpAnswerCodes.objNotFoundCode).json({
        message: errorTexts.cardNotFound,
      });
    }

    return res.status(httpAnswerCodes.validOperationCode).json(card);
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

const deleteLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, {
      $pull: { likes: req.user._id },
    }, { new: true }).populate(['owner', 'likes']);

    if (!card) {
      return res.status(httpAnswerCodes.objNotFoundCode).json({
        message: errorTexts.cardNotFound,
      });
    }

    return res.status(httpAnswerCodes.validOperationCode).json(card);
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
