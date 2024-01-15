const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllPlanMaestro(request, reply) {
  try {
    const { periodoId, sesionId, institucionId } = request.query;

    Logger.info('[Planes Maestros]: Get Planes Maestros');
    const datosDeProyecto = await this.opdServices.findAllPlanMaestro({
      periodoId, sesionId, institucionId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: datosDeProyecto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllPlanMaestro };
