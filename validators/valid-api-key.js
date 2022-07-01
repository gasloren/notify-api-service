const { header } = require('express-validator');

const apiKey = process.env.API_KEY;

// -----------------------------------------

const validApiKey = [
  header('Api-Key').exists(),
  header('Api-Key').isString(),
  header('Api-Key').notEmpty(),
  header('Api-Key').equals(apiKey)
];

module.exports = validApiKey;