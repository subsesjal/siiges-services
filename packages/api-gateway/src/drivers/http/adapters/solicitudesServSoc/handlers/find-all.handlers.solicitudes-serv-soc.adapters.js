const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesServSoc(req, reply) {
  try {
    Logger.info('[solicitudes Serv Soc]: Retrieving all solicitudes de servicio social');

    const solicitudesServSoc = await this.solicitudServicioSocialServices
      .findAllSolicitudesServSoc();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudesServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllSolicitudesServSoc };
