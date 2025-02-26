const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudServSocAlumno(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudServicioSocialId } = req.params;

    Logger.info(`[solicitudes Serv Soc Alumno]: Creating record for solicitudServicioSocialId ${solicitudServicioSocialId}`);

    const solicitudServSocAlumno = await this.solicitudServicioSocialServices
      .createSolicitudServSocAlumno(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudServSocAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudServSocAlumno };
