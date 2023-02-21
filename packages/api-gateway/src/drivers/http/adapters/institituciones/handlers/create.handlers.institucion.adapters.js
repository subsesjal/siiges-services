const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createInstitucion(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating institucion');

    const newInstitucion = await this.institucionServices.createInstitucion(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInstitucion;
