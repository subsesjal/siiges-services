const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneAlumnoTitulo(req, reply) {
  try {
    const { folioControl } = req.query;

    Logger.info(`[Alumno]: Getting Alumno Titulo with folio: ${folioControl}`);
    const alumnoTitulo = await this.administracionAcademicaServices.findOneAlumnoTitulo({
      folioControl,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnoTitulo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneAlumnoTitulo;
