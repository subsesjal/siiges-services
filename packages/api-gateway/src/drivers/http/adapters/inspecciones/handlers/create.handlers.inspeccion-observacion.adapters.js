const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createInspeccionObservacion(req, reply) {
  try {
    const { inspeccionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[inspecciones observaciones]: Creating inspecciones observaciones');

    const newInspeccionObservacion = await this.inspeccionServices.createInspeccionObservacion(
      { ...data, inspeccionId },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInspeccionObservacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInspeccionObservacion;
