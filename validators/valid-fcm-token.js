const { body } = require('express-validator');

// -----------------------------------------

const validFcmToken = [
  body('fcmToken').exists(),
  body('fcmToken').isString(),
  body('fcmToken').notEmpty()
];

module.exports = validFcmToken;