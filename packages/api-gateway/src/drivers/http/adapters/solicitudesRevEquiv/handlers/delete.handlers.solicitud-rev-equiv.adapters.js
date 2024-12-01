const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteEquivalencia(req, reply) {
  try {
    const { solicitudRevEquivId } = req.params;
    Logger.info(`[Solicitud]: Deleting equivalencia with id: ${solicitudRevEquivId}`);

    const solicitudRevEquiv = await this.solicitudRevEquivServices.deleteEquivalencia({
      id: solicitudRevEquivId,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudRevEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteEquivalencia;
