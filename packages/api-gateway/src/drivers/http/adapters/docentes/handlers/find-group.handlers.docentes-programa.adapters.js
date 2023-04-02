const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupDocentesPrograma(req, reply) {
  try {
    const { programaId } = req.params;

    Logger.info(`[docente]: Getting docentes by programa with id: ${programaId}`);
    const docentes = await this.solicitudServices.findGroupDocentesPrograma({
      programaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: docentes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupDocentesPrograma;
