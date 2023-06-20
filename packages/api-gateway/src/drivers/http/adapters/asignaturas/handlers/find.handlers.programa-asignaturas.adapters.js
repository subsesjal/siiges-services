const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findProgramaAsignaturas(req, reply) {
  try {
    const { programaId } = req.params;
    const queryParams = req.query;

    Logger.info('[programa]: Getting asignatura - programa');
    const asignatura = await this.solicitudServices.findProgramaAsignaturas(
      { programaId },
      queryParams,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignatura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findProgramaAsignaturas;
