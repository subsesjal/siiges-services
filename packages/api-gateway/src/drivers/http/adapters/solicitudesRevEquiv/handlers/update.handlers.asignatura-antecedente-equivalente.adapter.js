const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateAsignaturaAntecedenteEquivalente(req, reply) {
  try {
    const { asignaturaAntecedenteEquivalenteId } = req.params;
    const data = req.body;

    Logger.info('[solicitudes-rev-equiv]: Updating asignatura antecedente equivalente');

    const asignaturaAntecedenteEquivalente = await
    this.solicitudRevEquivServices.updateAsignaturaAntecedenteEquivalente(
      { id: asignaturaAntecedenteEquivalenteId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignaturaAntecedenteEquivalente });
  } catch (error) {
    Logger.error(
      '[solicitudes-rev-equiv]: Error updating asignatura antecedente equivalente',
      error,
    );
    return errorHandler(error, reply);
  }
}

module.exports = updateAsignaturaAntecedenteEquivalente;
