const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function asignacionFolioAlumno(req, reply) {
  try {
    const { solicitudFolioId } = req.params;
    Logger.info('[solicitudes-folios]: Asing folios Alumnos');

    const solicitudFolio = await this.solicitudFolioServices.assignFoliosAlumnos(
      { id: solicitudFolioId },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolio });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { asignacionFolioAlumno };
