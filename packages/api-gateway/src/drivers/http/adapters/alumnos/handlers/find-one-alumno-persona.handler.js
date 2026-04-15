const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupAlumnosPersona(req, reply) {
  try {
    const {
      curp, nombre, apellidoPaterno, apellidoMaterno, matricula,
    } = req.query;

    Logger.info(`[Alumno]: Searching Alumnos with params: ${JSON.stringify(req.query)}`);

    const alumnos = await this.administracionAcademicaServices.findGroupAlumnosPersona({
      curp,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      matricula,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupAlumnosPersona;
