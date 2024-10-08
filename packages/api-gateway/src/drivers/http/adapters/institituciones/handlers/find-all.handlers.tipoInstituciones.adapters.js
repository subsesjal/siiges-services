const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllTipoInstituciones(req, reply) {
  try {
    Logger.info('[tipoInstituciones]: Getting tipoInstituciones list');
    const tipoInstituciones = await this.institucionServices.findAllTipoInstituciones();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: tipoInstituciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllTipoInstituciones;
