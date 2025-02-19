const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesBeca(req, reply) {
  try {
    Logger.info('[Solicitudes-Becas]: Getting becas list');

    const becas = await this.solicitudBecaServices.findAllSolicitudesBeca();
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: becas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllSolicitudesBeca };
