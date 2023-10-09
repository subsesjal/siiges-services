const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function alumnosInscripcion(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[Alumno]: Inscripcion Alumno');

    const almnosInscritos = await this.administracionAcademicaServices.alumnosInscripcion(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: almnosInscritos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = alumnosInscripcion;
