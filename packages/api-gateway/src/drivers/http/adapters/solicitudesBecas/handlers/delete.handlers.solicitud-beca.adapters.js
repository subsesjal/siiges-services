const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

const deleteSolicitudBeca = async (req, reply) => {
  try {
    const { solicitudBecaId } = req.params;

    Logger.info(`[solicitud-beca]: Deleting solicitud beca with id: ${solicitudBecaId}`);

    const becaEliminada = await req.server.solicitudBecaServices.deleteSolicitudBeca({
      id: solicitudBecaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: becaEliminada });
  } catch (error) {
    return errorHandler(error, reply);
  }
};

module.exports = { deleteSolicitudBeca };
