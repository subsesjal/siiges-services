// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateTrayectoriaPrograma(request, reply) {
  try {
    const { trayectoriaId } = request.params;
    const { ...changes } = request.body;

    Logger.info('[api/trayectoria/update]: updating the trayectoria');
    const trayectoria = await this.solicitudServices.updateTrayectoriaPrograma(
      { trayectoriaId },
      changes,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: trayectoria });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateTrayectoriaPrograma;
