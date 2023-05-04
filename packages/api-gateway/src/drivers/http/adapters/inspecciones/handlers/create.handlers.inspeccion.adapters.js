const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createInspeccion(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[inspecciones]: Creating inspecciones');

    const newInspeccion = await this.inspeccionServices.createInspeccion(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInspeccion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInspeccion;
