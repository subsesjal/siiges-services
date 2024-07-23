const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function createSolicitudFolio(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes]: Creating solicitud');

    const solicitudFolio = await this.solicitudFolioServices.createSolicitudFolio(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolio });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudFolio };
