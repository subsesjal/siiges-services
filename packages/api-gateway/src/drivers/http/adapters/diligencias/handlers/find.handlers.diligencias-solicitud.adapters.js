// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findDiligenciasSolicitud(request, reply) {
  try {
    const { ...data } = request.params;

    Logger.info(`[api/diligencia/findOne]: finding diligences related to solicitud with id ${data.solicitudId}`);
    const diligencias = await this.solicitudServices.findDiligenciasBySolicitud(
      { query: { solicitudId: data.solicitudId } },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligencias });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findDiligenciasSolicitud;
