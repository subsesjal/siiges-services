const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateRatificacionNombre(req, reply) {
  try {
    const { institucionId, ratificacionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating ratificacion de nombre');

    const ratificacionNombre = await this.institucionServices.updateRatificacionNombre(
      { institucionId, ratificacionId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ratificacionNombre });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateRatificacionNombre;
