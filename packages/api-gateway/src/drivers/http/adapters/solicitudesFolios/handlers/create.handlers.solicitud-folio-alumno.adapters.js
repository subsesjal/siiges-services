const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudFolioAlumno(req, reply) {
  try {
    const { solicitudFolioId, alumnoId } = req.params;
    const { fechaTermino, fechaElaboracion } = req.body;

    const solicitudFolioAlumno = await this.solicitudFolioServices.createSolicitudFolioAlumno(
      {
        solicitudFolioId,
        alumnoId,
      },
      {
        fechaTermino,
        fechaElaboracion,
      },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolioAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudFolioAlumno };
