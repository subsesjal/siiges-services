const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneDocente(req, reply) {
  try {
    const { docenteId } = req.params;

    Logger.info(`[docente]: Getting docente with id: ${docenteId}`);
    const docente = await this.solicitudServices.findOneDocente({
      id: docenteId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: docente });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneDocente;
