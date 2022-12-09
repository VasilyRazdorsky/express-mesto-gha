const errorTexts = {
  baseError: 'Произошла ошибка',
  userNotFound: 'Пользователь не найден',
  cardNotFound: 'Карточка не найдена',
  incorrectData: 'Некорректные данные',
  incorrectId: 'Некорректный id',
};

const httpAnswerCodes = {
  baseErrorCode: 500,
  objNotFoundCode: 404,
  incorrectDataCode: 400,
  validOperationCode: 200,
  validCreationCode: 201,
};

module.exports = {
  errorTexts,
  httpAnswerCodes,
};
