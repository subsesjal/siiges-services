const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllInspectoresProgramas(req, reply) {
  try {
    Logger.info('[Inspector programas]: Creating inspector program');

    const InspectorProgram = await this.inspeccionServices.findAllInspectoresProgramas();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: InspectorProgram });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllInspectoresProgramas;
