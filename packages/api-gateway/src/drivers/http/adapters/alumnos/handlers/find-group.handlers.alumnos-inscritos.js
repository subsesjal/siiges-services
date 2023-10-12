const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosInscritos(req, reply) {
  try {
    const { grupoId } = req.params;

    Logger.info('[Alumno]: find Alumnos inscritos');

    const almnosInscritos = await this.administracionAcademicaServices.findAlumnosInscritos({
      grupoId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: almnosInscritos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosInscritos;
