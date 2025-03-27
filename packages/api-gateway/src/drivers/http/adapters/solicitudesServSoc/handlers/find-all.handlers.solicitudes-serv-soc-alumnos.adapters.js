const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesServSocAlumno(req, reply) {
  try {
    const { solicitudServicioSocialId } = req.params;

    Logger.info('[solicitudes Serv Soc Alumno]: Find all solicitudes servicio social alumnos');

    const solicitudesServSocAlumno = await this.solicitudServicioSocialServices
      .findAllSolicitudesServSocAlumno(solicitudServicioSocialId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudesServSocAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllSolicitudesServSocAlumno };
