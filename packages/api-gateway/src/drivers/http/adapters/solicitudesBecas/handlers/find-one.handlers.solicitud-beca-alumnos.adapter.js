const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudBecaAlumno(req, reply) {
  try {
    const { solicitudBecaId, solicitudBecaAlumnoId } = req.params;

    Logger.info(`[Solicitud-Beca]: Getting beca with id: ${solicitudBecaId} and alumno id: ${solicitudBecaAlumnoId}`);

    const becaAlumno = await this.solicitudBecaServices.findOneSolicitudBecaAlumno({
      solicitudBecaId,
      id: solicitudBecaAlumnoId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: becaAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSolicitudBecaAlumno };
