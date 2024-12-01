const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllEquivalencias(req, reply) {
  try {
    const { solicitudRevEquivId } = req.query;
    Logger.info('[solicitudes]: Getting solicitudes list');

    const solicitudesRevEquiv = await this.solicitudRevEquivServices.findAllEquivalencias({
      solicitudRevEquivId,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudesRevEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllEquivalencias;
