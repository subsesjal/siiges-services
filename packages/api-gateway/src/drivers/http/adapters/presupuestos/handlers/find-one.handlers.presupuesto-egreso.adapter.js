const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOnePresupuesto(request, reply) {
  try {
    const { presupuestoEgresoId } = request.params;
    const { filter } = request.query;

    Logger.info('[Presupuestos]: find a Presupuesto');
    const presupuesto = await this.opdServices.findOnePresupuesto({ presupuestoEgresoId, filter });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: presupuesto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOnePresupuesto };
