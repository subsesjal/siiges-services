const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deletePlantelInfraestructura(req, reply) {
  try {
    const { plantelId, id } = req.params;

    Logger.info('[api/higiene/delete]: deleting link between plantel and Infraestructura');
    const InfraestructuraDeleted = await this.solicitudServices.deletePlantelInfraestructura({
      plantelId,
      id,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: InfraestructuraDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deletePlantelInfraestructura;
