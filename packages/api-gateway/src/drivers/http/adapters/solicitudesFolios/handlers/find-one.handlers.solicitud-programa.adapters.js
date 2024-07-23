const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudFolio(req, reply) {
  try {
    const { solicitudFolioId } = req.params;

    Logger.info('[solicitudes]: Getting solicitud folio');
    const solicitudFolio = await this.solicitudFolioServices.findOneSolicitudFolio(
      { id: solicitudFolioId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolio });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSolicitudFolio };
