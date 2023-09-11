const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createSaludInstitucion(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[institución salud]: Creating institucion-salud');

    const newInstitucionSalud = await this.institucionServices.createSaludInstitucion(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInstitucionSalud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createSaludInstitucion;
