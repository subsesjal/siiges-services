const boom = require('@hapi/boom');
const { config } = require('../../../../config/environment');
const errorHandler = require('./errorHandler');

// eslint-disable-next-line consistent-return
const validateApiKey = (req, reply, next) => {
  try {
    const apiKey = req.headers.api_key;

    if (apiKey === config.apiKey) {
      next();
    } else {
      throw boom.unauthorized('Unauthorized access to this API. You need an API KEY');
    }
  } catch (error) {
    return errorHandler(error, reply);
  }
};

// eslint-disable-next-line consistent-return
const jwtVerify = async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
};

module.exports = { validateApiKey, jwtVerify };
