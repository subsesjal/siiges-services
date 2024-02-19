const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updatePresupuesto(request, reply) {
  try {
    const { presupuestoEgresoId } = request.params;
    const data = request.body;

    Logger.info('[Presupuestos]: update a Presupuesto');
    const presupuesto = await this.opdServices.updatePresupuesto({ presupuestoEgresoId, data });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: presupuesto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updatePresupuesto };
