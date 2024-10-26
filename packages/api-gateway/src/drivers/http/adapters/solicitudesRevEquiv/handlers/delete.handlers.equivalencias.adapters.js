const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteEquivalencia(req, reply) {
  try {
    const { equivalenciaId } = req.params;
    Logger.info(`[Solicitud]: Deleting equivalencia with id: ${equivalenciaId}`);
    const equivalencia = await this.solicitudServices.deleteEquivalencia({
      id: equivalenciaId,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: equivalencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteEquivalencia;
