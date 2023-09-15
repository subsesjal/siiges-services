const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllInspectoresProgramas(req, reply) {
  try {
    Logger.info('[Inspector programas]: Creating inspector program');

    const inspectoresPrograma = await this.inspeccionServices.findAllInspectores();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspectoresPrograma });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllInspectoresProgramas;
