const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSeguridad(req, reply) {
  try {
    Logger.info('[Seguridad]: Getting Seguridad Sistemas list');
    const seguridad = await this.institucionServices.findAllSeguridad();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: seguridad });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllSeguridad;
