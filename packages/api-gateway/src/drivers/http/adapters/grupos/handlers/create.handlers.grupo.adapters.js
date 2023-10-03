const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createGrupo(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[Grupo]: creating Grupo');
    const Grupo = await this.administracionAcademicaServices.createGrupo(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: Grupo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createGrupo };
