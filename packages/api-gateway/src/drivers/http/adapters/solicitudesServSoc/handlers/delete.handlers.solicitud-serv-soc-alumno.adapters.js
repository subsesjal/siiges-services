const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteSolicitudServSocAlumno(req, reply) {
  try {
    const { solicitudesServicioSocialAlumnoId } = req.params;

    Logger.info(`[solicitud-servicio-social-Alumno]: Deleting solicitud servicio social Alumno with id: ${solicitudesServicioSocialAlumnoId}`);

    const SolicitudEliminada = await this.solicitudServicioSocialServices
      .deleteSolicitudServSocAlumno({
        id: solicitudesServicioSocialAlumnoId,
      });
    // console.log(this);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: SolicitudEliminada });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteSolicitudServSocAlumno };
