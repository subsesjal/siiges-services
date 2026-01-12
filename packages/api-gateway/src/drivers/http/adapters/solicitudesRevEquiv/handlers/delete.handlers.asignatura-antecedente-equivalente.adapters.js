const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteAsignaturaAntecedenteEquivalente(req, reply) {
  try {
    const { asignaturaAntecedenteEquivalenteId } = req.params;

    Logger.info(
      `[SolicitudRevEquiv]: Deleting AsignaturaAntecedenteEquivalente with id: ${asignaturaAntecedenteEquivalenteId}`,
    );

    // eslint-disable-next-line max-len
    const deletedAsignatura = await this.solicitudRevEquivServices.deleteAsignaturaAntecedenteEquivalente({ id: asignaturaAntecedenteEquivalenteId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: deletedAsignatura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteAsignaturaAntecedenteEquivalente;
