const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudBeca(request, reply) {
  try {
    const { solicitudBecaId } = request.params;
    const data = request.body;
    Logger.info('[SolicutudBeca]: update solicitud beca');
    const solicitudBeca = await this.solicitudBecaServices
      .updateSolicitudBeca(data, { id: solicitudBecaId });
    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudBeca });
  } catch (error) {
    return errorHandler(error, reply);
  }
}
module.exports = { updateSolicitudBeca };
