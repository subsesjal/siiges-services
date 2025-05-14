const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosExtra(req, reply) {
  try {
    const { cicloEscolarId } = req.params;

    Logger.info('[Alumno]: find group alumnos - extraordinarios');

    const almnosExtra = await this.administracionAcademicaServices.findAlumnosExtra({
      cicloEscolarId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: almnosExtra });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosExtra;
