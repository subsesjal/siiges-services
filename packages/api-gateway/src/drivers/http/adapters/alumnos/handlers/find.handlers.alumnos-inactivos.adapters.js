const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosInactivos(req, reply) {
  try {
    const { institucionId, plantelId, programaId } = req.query;
    Logger.info('[Alumno]: Obteniendo listado de alumnos inactivos');
    const result = await this.administracionAcademicaServices.findAllAlumnosInactivos({
      institucionId: Number(institucionId),
      plantelId: plantelId ? Number(plantelId) : undefined,
      programaId: programaId ? Number(programaId) : undefined,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: result });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosInactivos;
