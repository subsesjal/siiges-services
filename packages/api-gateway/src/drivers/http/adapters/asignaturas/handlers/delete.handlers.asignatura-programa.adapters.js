// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function deleteAsignaturaPrograma(request, reply) {
  try {
    const { asignaturaId } = request.params;

    Logger.info('[api/asignatura/delete]: deleting the asignatura');
    const asignatura = await this.solicitudServices.deleteAsignatura(
      { id: asignaturaId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignatura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteAsignaturaPrograma;
