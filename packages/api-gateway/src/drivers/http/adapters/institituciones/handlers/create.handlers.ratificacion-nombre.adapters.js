const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createRatificacionNombre(req, reply) {
  try {
    const { institucionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating ratificacion de nombre');

    const ratificacionNombre = await this.institucionServices.createRatificacionNombre(
      institucionId,
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ratificacionNombre });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createRatificacionNombre;
