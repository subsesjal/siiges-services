const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createAlumno(req, reply) {
  try {
    const { userId } = req;
    const { rvoe } = req.query;
    const data = req.body;

    Logger.info(`[Alumno]: Creating Alumno by user ${userId}`);

    const alumnos = await this.externalServices.createAlumnos(
      { rvoe, userId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  create: createAlumno,
};
