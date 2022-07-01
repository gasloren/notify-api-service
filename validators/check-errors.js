const { validationResult } = require('express-validator');

// ----------------------------------------------

const checkErrors = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0]
    });
  }

  next();

};

module.exports = checkErrors;