const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneAsignaturaPrograma(req, reply) {
  try {
    const { asignaturaId } = req.params;

    Logger.info(`[asignaturas]: Getting institución ${asignaturaId}`);
    const asignatura = await this.solicitudServices.findOneAsignatura({
      id: asignaturaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignatura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneAsignaturaPrograma;
