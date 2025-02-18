const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudBeca(req, reply) {
  try {
    const { becaId } = req.params;

    Logger.info(`[Solicitudes-Becas]: Getting beca with id: ${becaId}`);

    const beca = await this.solicitudBecaServices.findOneSolicitudBeca({ id: becaId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: beca });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSolicitudBeca };
