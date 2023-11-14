const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function alumnosInscripcion(req, reply) {
  try {
    const data = req.body;
    const { grupoId, asignaturaId } = req.params;
    const { tipo } = req.query;

    Logger.info('[Alumno]: Calificaciones');

    const calificaciones = await this.administracionAcademicaServices.updateCalificaciones({
      asignaturaId,
      grupoId,
      tipo,
    }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: calificaciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = alumnosInscripcion;
