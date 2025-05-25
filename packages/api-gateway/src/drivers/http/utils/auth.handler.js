const boom = require('@hapi/boom');
const { config } = require('../../../../config/environment');
const errorHandler = require('./errorHandler');

// eslint-disable-next-line consistent-return
const validateApiKey = (req, reply, next) => {
  try {
    const { url } = req;
    const apiKeyFromHeader = req.headers.api_key;

    const isSwaggerDoc = url.startsWith('/doc');
    const isUpload = url.startsWith('/uploads');
    if (isSwaggerDoc || isUpload) {
      return next();
    }

    // Missing key
    if (!apiKeyFromHeader) {
      throw boom.unauthorized('Acceso no autorizado. Falta la API KEY en el encabezado.');
    }

    // External route
    if (url.startsWith('/api/v2/external')) {
      if (apiKeyFromHeader !== config.externalApiKey) {
        throw boom.unauthorized('API KEY externa no válida.');
      }
      return next();
    }

    // Public/private
    if (apiKeyFromHeader !== config.apiKey) {
      throw boom.unauthorized('API KEY no válida.');
    }

    next();
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
