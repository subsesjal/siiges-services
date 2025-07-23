const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createCalificaciones(req, reply) {
  try {
    const { userId } = req;
    const data = req.body;
    const {
      rvoe, grupo, cicloEscolar, turno, grado, asignatura,
    } = req.query;

    Logger.info(`[Alumno]: Creating Calificaciones for Alumno grupo ${grupo}, ciclo escolar ${cicloEscolar}, turno ${turno}, grado ${grado}`);

    const alumnosCalificaciones = await this.externalServices.calificaciones({
      grupo, cicloEscolar, turno, grado, rvoe, asignatura, userId,
    }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnosCalificaciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  calificaciones: createCalificaciones,
};
