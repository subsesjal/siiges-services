const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudFolioAlumnosFirmar(req, reply) {
  try {
    const { programaId } = req.params;
    const { matricula, situacionId, tipoDocumentoId } = req.query;

    const alumno = await this.solicitudFolioServices.findAllSolicitudFolioAlumnosFirmar({
      matricula,
      programaId,
      situacionId: situacionId ? Number(situacionId) : undefined,
      tipoDocumentoId: tipoDocumentoId ? Number(tipoDocumentoId) : undefined,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllSolicitudFolioAlumnosFirmar };
