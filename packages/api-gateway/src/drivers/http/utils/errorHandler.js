const { ValidationError, ConnectionRefusedError } = require('sequelize');
const boom = require('@hapi/boom');

function boomErrorhandler(error, reply) {
  const { output, data } = error;
  return reply.code(output.statusCode).send({
    statusCode: output.payload.statusCode,
    error: output.payload.error,
    message: output.payload.message,
    data,
  });
}

function errorHandler(error, reply) {
  if (error instanceof ValidationError) {
    const boomError = boom.conflict('There was a conflict', error);
    boomErrorhandler(boomError, reply);
  }

  if (error instanceof ConnectionRefusedError) {
    const boomError = boom.serverUnavailable('Connection Refused error', error);
    boomErrorhandler(boomError, reply);
  }

  if (error.isBoom) {
    boomErrorhandler(error, reply);
  }

  return reply.code(500).send({ message: error.message, stack: error.stack });
}

module.exports = errorHandler;
