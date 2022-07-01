const { body } = require('express-validator');

// -----------------------------------------

const validPayload = [
  body('payload').exists(),
  body('payload').isObject(),
  body('payload').notEmpty(),
  body('payload.title').exists(),
  body('payload.title').isString(),
  body('payload.title').notEmpty(),
  body('payload.label').exists(),
  body('payload.label').isString(),
  body('payload.label').notEmpty()
];

module.exports = validPayload;