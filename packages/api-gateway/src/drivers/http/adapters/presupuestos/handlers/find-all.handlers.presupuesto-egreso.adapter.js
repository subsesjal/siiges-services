const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllPresupuesto(request, reply) {
  try {
    const { institucionId } = request.params;

    Logger.info('[Presupuestos]: find all Presupuestos');
    const presupuesto = await this.opdServices.findAllPresupuesto({ institucionId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: presupuesto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllPresupuesto };
