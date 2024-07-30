const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudFolioAlumno(req, reply) {
  try {
    const { solicitudFolioId, alumnoId } = req.params;
    const { ...data } = req.body;

    const solicitudFolioAlumno = await this.solicitudFolioServices.createSolicitudFolioAlumno({
      solicitudFolioId,
      alumnoId,
      ...data,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolioAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudFolioAlumno };
