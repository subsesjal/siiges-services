const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneRatificacionNombre(req, reply) {
  try {
    const { institucionId, ratificacionId } = req.params;

    Logger.info(`[instituciones]: Getting ratificacion ${ratificacionId}`);

    const plantel = await this.institucionServices.findOneRatificacionNombre({
      institucionId,
      ratificacionId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneRatificacionNombre;
