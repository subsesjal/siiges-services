const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosCount(req, reply) {
  try {
    const { programaId } = req.params;
    const { situacionId } = req.query;

    Logger.info('[Alumno]: Contando alumnos por programa y situación para traer el total');

    const { totalAlumnos } = await
    this.administracionAcademicaServices.findAllAlumnosCount({
      programaId,
      situacionId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        data: {
          totalAlumnos,
        },
      });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosCount;
