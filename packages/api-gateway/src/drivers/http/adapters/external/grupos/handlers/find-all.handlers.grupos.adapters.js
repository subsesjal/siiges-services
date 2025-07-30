const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findAllGrupos(req, reply) {
  Logger.info('[Grupos.findAllGrupos.handler]: Obteniendo Grupos para Rvoe');
  try {
    const { userId } = req;
    const { rvoe, cicloEscolar, grado } = req.query;

    const grupos = await this.externalServices.findAllGrupos({
      rvoe,
      userId,
      cicloEscolar,
      grado,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: grupos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findAll: findAllGrupos,
};
