const boom = require('@hapi/boom');
const { config } = require('../../../../config/environment');
const errorHandler = require('./errorHandler');

// eslint-disable-next-line consistent-return
function validateApiKey(req, reply, next) {
  try {
    const apiKey = req.headers.api_key;

    if (apiKey === config.apiKey) {
      next();
    } else {
      throw boom.unauthorized();
    }
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { validateApiKey };
