const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findVigilanciasByVigilante(req, reply) {
  try {
    const { vigilanteId } = req.params;

    Logger.info(`[Vigilantes/Vigilancias]: Obtaining vigilancias for vigilante with ID ${vigilanteId}`);
    const vigilancias = await this.opdServices.findVigilanciasByVigilante({ vigilanteId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: vigilancias });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findVigilanciasByVigilante;
