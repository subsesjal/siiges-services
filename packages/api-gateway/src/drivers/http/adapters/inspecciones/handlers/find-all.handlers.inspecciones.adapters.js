const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllinspecciones(req, reply) {
  try {
    Logger.info('[Inspecciones]: Getting inspecciones list');
    const inspecciones = await this.inspeccionServices.findAllInspecciones({ });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspecciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllinspecciones;
