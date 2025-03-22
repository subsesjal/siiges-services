const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllDimensionesServSoc(req, reply) {
  try {
    Logger.info('[solicitudes Serv Soc]: Obtiene una lista de todas las dimensiones de servicio social');

    const solicitudesServSoc = await this.solicitudServicioSocialServices
      .findAllDimensionesServSoc();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudesServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllDimensionesServSoc };
