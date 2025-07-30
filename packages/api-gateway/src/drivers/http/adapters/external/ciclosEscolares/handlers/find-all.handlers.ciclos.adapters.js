const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findAllCiclos(req, reply) {
  Logger.info('[CicloEscolar.findAllCiclos.handler]: Obteniendo ciclos escolares para Rvoe');
  try {
    const { userId } = req;
    const { rvoe } = req.query;

    const ciclos = await this.externalServices.findAllCiclos({ rvoe, userId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ciclos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findAll: findAllCiclos,
};
