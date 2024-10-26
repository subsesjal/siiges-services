const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllEquivalencias(req, reply) {
  try {
    const { equivalenciasId } = req.query;

    Logger.info('[solicitudes]: Getting solicitudes list');
    const equivalencias = await this.solicitudServices.findAllEquivalencias({
      equivalenciasId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: equivalencias });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllEquivalencias;
