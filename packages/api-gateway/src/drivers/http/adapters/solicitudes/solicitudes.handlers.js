const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../utils/errorHandler');

// solicitudes services
async function createSolicitudPrograma(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes]: Creating solicitud');

    const newSolicitud = await this.solicitudServices.createSolicitud(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newSolicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  createSolicitudPrograma,
};
