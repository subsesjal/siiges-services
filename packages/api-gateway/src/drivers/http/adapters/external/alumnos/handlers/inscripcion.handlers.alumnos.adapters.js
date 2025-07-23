const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function inscripcionAlumno(req, reply) {
  try {
    const { userId } = req;
    const data = req.body;
    const {
      rvoe, grupo, cicloEscolar, turno, grado,
    } = req.query;

    Logger.info('[Alumno]: Inscripcion Alumno');

    const almnosAsignaturas = await this.externalServices.inscripcion({
      grupo, cicloEscolar, turno, grado, rvoe, userId,
    }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: almnosAsignaturas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  inscripcion: inscripcionAlumno,
};
