const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudFolioAlumnos(req, reply) {
  try {
    const {
      solicitudFolioId,
    } = req.params;

    Logger.info('[solicitudes]: Getting solicitudes list');
    const alumnosSolicitudes = await this.solicitudFolioServices.findAllSolicitudFolioAlumnos({
      solicitudFolioId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnosSolicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllSolicitudFolioAlumnos };
