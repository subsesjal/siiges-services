const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneTrayectoriaPrograma(req, reply) {
  try {
    const { programaId } = req.params;

    Logger.info('[trayectoria]: Getting trayectoria - programa');
    const trayectoria = await this.solicitudServices.findOneTrayectoriaPrograma(
      { programaId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: trayectoria });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneTrayectoriaPrograma;
