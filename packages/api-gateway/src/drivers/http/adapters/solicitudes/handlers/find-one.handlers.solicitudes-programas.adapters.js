const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudesProgramas(req, reply) {
  try {
    Logger.info('[solicitudes]: Getting solicitudes list');
    const solicitudes = await this.solicitudServices.findOneSolicitudesProgramas();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneSolicitudesProgramas;
