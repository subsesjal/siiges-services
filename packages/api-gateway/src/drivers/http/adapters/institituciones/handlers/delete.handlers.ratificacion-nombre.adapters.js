const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteRatificacionNombre(req, reply) {
  try {
    const { institucionId, ratificacionId } = req.params;

    Logger.info(`[instituciones]: Deleting ratificacion ${ratificacionId}`);

    const ratificacionNombre = await this.institucionServices.deleteRatificacionNombre({
      institucionId,
      ratificacionId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ratificacionNombre });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteRatificacionNombre;
