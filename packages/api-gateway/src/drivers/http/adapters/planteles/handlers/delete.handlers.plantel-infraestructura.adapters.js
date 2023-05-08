const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deletePlantelInfraestructura(req, reply) {
  try {
    const { plantelId, infraestructuraId } = req.params;

    Logger.info('[api/higiene/delete]: deleting link between plantel and Infraestructura');
    const infraestructuraDeleted = await this.solicitudServices.deletePlantelInfraestructura({
      plantelId,
      infraestructuraId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: infraestructuraDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deletePlantelInfraestructura;
