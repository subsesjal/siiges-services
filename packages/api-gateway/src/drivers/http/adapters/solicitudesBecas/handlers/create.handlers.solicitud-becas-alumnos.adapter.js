const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudBecasAlumnos(req, reply) {
  try {
    const { solicitudBecaId } = req.params;
    const data = req.body;
    Logger.info(`[solicitudes Beca Alumno]: Creating record for createSolicitudBecasId ${solicitudBecaId}`);
    console.log('Datos recibidos en el handler:', data);
    const solicitudBecaAlumno = await this.solicitudBecaServices
      .createSolicitudBecasAlumnos({ ...data, solicitudBecaId });
    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudBecaAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}
module.exports = { createSolicitudBecasAlumnos };
