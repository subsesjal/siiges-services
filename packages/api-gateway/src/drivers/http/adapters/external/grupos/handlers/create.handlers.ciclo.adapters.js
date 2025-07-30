const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createCicloEscolar(req, reply) {
  Logger.info('[CicloEscolar.createCicloEscolar.handler]: Obteniendo ciclos escolares para Rvoe');
  try {
    const { userId } = req;
    const { rvoe } = req.query;
    const data = req.body;

    const ciclo = await this.externalServices.createCicloEscolar({ rvoe, userId }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ciclo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  create: createCicloEscolar,
};
