const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudRevEquiv(req, reply) {
  try {
    const data = req.body;
    const { solicitudRevEquivId } = req.params;

    const updatedEquiv = await this.solicitudRevEquivServices
      .updateSolicitudRevEquiv(data, { id: solicitudRevEquivId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updatedEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitudRevEquiv;
