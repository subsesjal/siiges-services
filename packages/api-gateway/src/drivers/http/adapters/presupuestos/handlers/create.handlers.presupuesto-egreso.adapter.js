const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createPresupuesto(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[Presupuestos]: creating Presupuesto');
    const presupuesto = await this.opdServices.createPresupuesto(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: presupuesto });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createPresupuesto };
