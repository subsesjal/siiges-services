const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudFolioAlumno(req, reply) {
  try {
    const { solicitudFolioId } = req.params;
    const alumnos = req.body;

    const resultado = await this.solicitudFolioServices.createSolicitudFolioAlumno({
      solicitudFolioId,
      alumnos,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: resultado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudFolioAlumno };
