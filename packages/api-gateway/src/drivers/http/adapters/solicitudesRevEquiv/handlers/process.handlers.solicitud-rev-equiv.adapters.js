const errorHandler = require('../../../utils/errorHandler');

async function processSolicitudRevEquiv(req, reply) {
  try {
    const data = req.body;
    const { solicitudRevEquivId } = req.params;

    const solicitud = await this.solicitudRevEquivServices
      .processSolicitudRevEquiv({ id: solicitudRevEquivId }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = processSolicitudRevEquiv;
