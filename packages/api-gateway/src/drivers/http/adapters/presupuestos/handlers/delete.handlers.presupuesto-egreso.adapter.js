const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deletePresupuesto(request, reply) {
  try {
    const { presupuestoId } = request.params;

    Logger.info('[Presupuestos]: delete a Presupuesto');
    const presupuesto = await this.opdServices.deletePresupuesto({ presupuestoId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: presupuesto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deletePresupuesto };
