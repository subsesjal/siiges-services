const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createDatosDeProyecto(request, reply) {
  try {
    const { ...data } = request.body;
    const { planMaestroId } = request.params;

    Logger.info('[Planes Maestros]: creating Planes Maestros');
    const datosDeProyecto = await this.opdServices.createDatosDeProyecto({
      ...data,
      planMaestroId,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: datosDeProyecto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createDatosDeProyecto };
