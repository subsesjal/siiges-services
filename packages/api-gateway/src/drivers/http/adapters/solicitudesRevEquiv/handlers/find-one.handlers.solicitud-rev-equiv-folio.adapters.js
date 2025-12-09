const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findSolicitudRevEquivByFolio(req, reply) {
  try {
    const { folioSolicitud } = req.query;

    Logger.info('[SolicitudRevEquiv]: Public GET equivalencia por folio (query param)');

    const solicitudRevEquiv = await this.solicitudRevEquivServices
      .findOneSolicitudRevEquiv({ folioSolicitud });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudRevEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findSolicitudRevEquivByFolio;
