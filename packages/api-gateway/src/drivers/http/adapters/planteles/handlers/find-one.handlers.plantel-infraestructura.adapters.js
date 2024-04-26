const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOnePlantelInfraestructura(req, reply) {
  try {
    const { infraestructuraId, plantelId } = req.params;

    Logger.info(`[infraestructura]: Getting infraestructura with id: ${infraestructuraId}`);
    const infraestructura = await this.solicitudServices.findOnePlantelInfraestructura({
      plantelId,
      infraestructuraId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: infraestructura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOnePlantelInfraestructura;
