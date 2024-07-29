const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudFolioAlumno(req, reply) {
  try {
    const { fechaTermino, fechaElaboracion } = req.body;
    const { solicitudFolioAlumnoId } = req.params;

    Logger.info('[solicitudesFoliosAlumnos]: Updating record');

    const updatedRecord = await this.solicitudFolioServices.updateSolicitudFolioAlumno(
      { id: solicitudFolioAlumnoId },
      { fechaTermino, fechaElaboracion },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updatedRecord });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSolicitudFolioAlumno };
