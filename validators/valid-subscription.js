const { body } = require('express-validator');

// -----------------------------------------

const validSubscription = [
  body('subscription').exists(),
  body('subscription').isObject(),
  body('subscription').notEmpty(),
  body('subscription.endpoint').exists(),
  body('subscription.endpoint').isString(),
  body('subscription.endpoint').notEmpty(),
  body('subscription.keys').exists(),
  body('subscription.keys').isObject(),
  body('subscription.keys').notEmpty()
];

module.exports = validSubscription;