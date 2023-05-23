// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function deleteInspeccion(request, reply) {
  try {
    const { inspeccionId } = request.params;

    Logger.info('[api/inspeccion/delete]: deleting the inspecciones');
    const inspeccion = await this.inspeccionServices.deleteInspeccion(
      { id: inspeccionId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspeccion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteInspeccion;
