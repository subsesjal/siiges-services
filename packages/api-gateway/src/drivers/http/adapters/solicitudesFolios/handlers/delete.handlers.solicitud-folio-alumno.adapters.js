const errorHandler = require('../../../utils/errorHandler');

async function deleteSolicitudFolioAlumno(req, reply) {
  try {
    const { solicitudFolioAlumnoId } = req.params;

    const alumno = await this.solicitudFolioServices.deleteSolicitudFolioAlumno(
      { id: solicitudFolioAlumnoId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteSolicitudFolioAlumno };
