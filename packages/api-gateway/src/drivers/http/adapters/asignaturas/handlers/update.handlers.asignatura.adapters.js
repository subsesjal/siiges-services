// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateAsignatura(request, reply) {
  try {
    const { asignaturasId } = request.params;
    const { ...changes } = request.body;

    Logger.info('[api/asignatura/update]: updating the diligence');
    const asignaturas = await this.solicitudServices.updateAsignatura(
      { id: asignaturasId },
      changes,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignaturas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateAsignatura;
