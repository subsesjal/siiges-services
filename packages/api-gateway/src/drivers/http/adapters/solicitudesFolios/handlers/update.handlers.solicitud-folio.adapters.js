const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudFolio(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudFolioId } = req.params;
    Logger.info('[solicitudes]: Creating solicitud');

    const solicitudFolio = await this.solicitudFolioServices.updateSolicitudFolio(
      { id: solicitudFolioId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolio });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSolicitudFolio };
