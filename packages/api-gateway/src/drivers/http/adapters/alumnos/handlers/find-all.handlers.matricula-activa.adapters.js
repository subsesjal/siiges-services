const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findMatriculaActiva(req, reply) {
  try {
    const { institucionId, plantelId, programaId } = req.query;

    Logger.info('[Alumno]: Obteniendo matrícula activa por institución');

    const result = await this.administracionAcademicaServices.findAllMatriculaActiva({
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

module.exports = findMatriculaActiva;
