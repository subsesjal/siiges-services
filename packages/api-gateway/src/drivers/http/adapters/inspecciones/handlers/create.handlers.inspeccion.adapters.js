const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createInspecciones(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[inspecciones]: Creating inspecciones');

    const newInspecciones = await this.inspeccionesServices.createInspecciones(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInspecciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInspecciones;
