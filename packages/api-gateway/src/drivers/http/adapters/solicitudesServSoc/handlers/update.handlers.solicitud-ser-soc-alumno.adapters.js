const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudServSocAlumno(req, reply) {
  try {
    const { solicitudServicioSocialAlumnoId } = req.params;
    const data = req.body;

    Logger.info(`[Solicitudes Serv Soc]: Updating record for solicitudServicioSocialAlumnoId ${solicitudServicioSocialAlumnoId}`);

    const solicitudServSocAlumno = await this.solicitudServicioSocialServices
      .updateSolicitudServSocAlumno({
        id: solicitudServicioSocialAlumnoId,
      }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudServSocAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSolicitudServSocAlumno };
