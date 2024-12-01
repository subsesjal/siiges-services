const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneEquivalencia(req, reply) {
  try {
    const { solicitudRevEquivId } = req.params;
    Logger.info('[solicitudes]: Getting solicitud - equivalencia');

    const solicitudRevEquiv = await this.solicitudRevEquivServices.findOneEquivalencia(
      { id: solicitudRevEquivId },
    );
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudRevEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneEquivalencia;
