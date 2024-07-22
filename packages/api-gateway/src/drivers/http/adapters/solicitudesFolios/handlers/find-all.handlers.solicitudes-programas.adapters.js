const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesFolios(req, reply) {
  try {
    const {
      estatusSolicitudFolioId, tipoDocumentoId, tipoSolicitudFolioId, programaId,
    } = req.query;

    Logger.info('[solicitudes]: Getting solicitudes list');
    const solicitudes = await this.solicitudFolioServices.findAllSolicitudesFolios({
      estatusSolicitudFolioId, tipoDocumentoId, tipoSolicitudFolioId, programaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllSolicitudesFolios };
