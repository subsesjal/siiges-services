const errorHandler = require('../../../utils/errorHandler');

async function updateEquivalencia(req, reply) {
  try {
    const equiv = req.body;
    const solicitudId = req.params.solicitudRevEquivId;
    const updatedEquiv = await this.solicitudServices.updateEquivalencia(equiv, solicitudId);
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updatedEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateEquivalencia;
