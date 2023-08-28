const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createInspectoresProgramas(req, reply) {
  try {
    const { ...data } = req.body;
    Logger.info('[Inspector programas]: Creating inspector program');

    const newInspectorProgram = await this.inspeccionServices.createInspectorProgramas(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInspectorProgram });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInspectoresProgramas;
