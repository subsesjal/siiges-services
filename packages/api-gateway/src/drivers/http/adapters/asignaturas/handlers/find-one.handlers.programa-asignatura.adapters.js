const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findProgramaAsignatura(req, reply) {
  try {
    const { programaId } = req.params;

    Logger.info('[programa]: Getting asignatura - programa');
    const programa = await this.solicitudServices.findProgramaAsignatura(
      { id: programaId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programa });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findProgramaAsignatura;
