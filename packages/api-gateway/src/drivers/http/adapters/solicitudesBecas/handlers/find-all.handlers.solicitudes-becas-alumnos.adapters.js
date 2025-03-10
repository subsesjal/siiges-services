const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesBecasAlumnos(req, reply) {
  try {
    const { solicitudBecaId } = req.params;

    Logger.info(`[Solicitud-Beca]: Obteniendo beca con id: ${solicitudBecaId}`);

    const becas = await this.solicitudBecaServices.findAllSolicitudesBecasAlumnos(solicitudBecaId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: becas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}
module.exports = { findAllSolicitudesBecasAlumnos };
