const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// asignatura services
async function createAsignaturaPrograma(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[asignatura]: Creating asignatura');

    const newAsignatura = await this.opdServices.createAsignaturaPrograma(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newAsignatura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createAsignaturaPrograma;
