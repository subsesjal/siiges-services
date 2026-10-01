const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudFolioAlumnosFirmar(req, reply) {
  try {
    const { programaId } = req.params;
    const {
      matricula,
      situacionId,
      tipoDocumentoId,
      parcial,
    } = req.query;
    const situacionIds = [].concat(situacionId ?? []).map(Number);

    const alumno = await this.solicitudFolioServices.findAllSolicitudFolioAlumnosFirmar({
      matricula,
      programaId,
      situacionIds,
      tipoDocumentoId: tipoDocumentoId ? Number(tipoDocumentoId) : undefined,
      parcial: Boolean(parcial),
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
