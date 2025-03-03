const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudServSocAlumno(req, reply) {
  try {
    const { solicitudServicioSocialId, solicitudesServicioSocialAlumnosId } = req.params;

    Logger.info(`[solicitudes Serv Soc Alumno]: Finding solicitud with id ${solicitudesServicioSocialAlumnosId} for solicitudServicioSocialId ${solicitudServicioSocialId}`);

    const solicitudServSocAlumno = await this.solicitudServicioSocialServices
      .findOneSolicitudServSocAlumno(solicitudesServicioSocialAlumnosId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudServSocAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSolicitudServSocAlumno };
