const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function createSolicitudBeca(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes Becas]: Creating solicitud');

    const solicitudBeca = await this.solicitudBecaServices.createSolicitudBeca(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudBeca });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudBeca };
