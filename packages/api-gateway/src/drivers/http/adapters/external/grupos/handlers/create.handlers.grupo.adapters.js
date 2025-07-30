const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createGrupo(req, reply) {
  Logger.info('[CicloEscolar.createGrupo.handler]: Creando grupo para Rvoe');
  try {
    const { userId } = req;
    const {
      rvoe, cicloEscolar, grado, turno,
    } = req.query;
    const data = req.body;

    const ciclo = await this.externalServices.createGrupo({
      rvoe,
      cicloEscolar,
      grado,
      turno,
      userId,
    }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ciclo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  create: createGrupo,
};
