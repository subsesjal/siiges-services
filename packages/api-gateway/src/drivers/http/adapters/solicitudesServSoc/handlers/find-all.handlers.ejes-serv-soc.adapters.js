const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllEjesServSoc(req, reply) {
  try {
    Logger.info('[solicitudes Serv Soc]: Obtiene una lista de todas los Ejes x Dimension ID de servicio social');

    const { dimensionServicioSocialId } = req.query;

    const ejesServSoc = await this.solicitudServicioSocialServices
      .findAllEjesServSoc({ dimensionServicioSocialId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ejesServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllEjesServSoc };
