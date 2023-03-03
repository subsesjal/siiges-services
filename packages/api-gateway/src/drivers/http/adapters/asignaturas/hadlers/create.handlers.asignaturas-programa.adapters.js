const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// asignaturas services
async function createAsignaturaPrograma(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[asignaturas]: Creating asignatura');

    const newSolicitud = await this.asignaturasServices.createAsignaturaPrograma(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newSolicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createAsignaturaPrograma;
