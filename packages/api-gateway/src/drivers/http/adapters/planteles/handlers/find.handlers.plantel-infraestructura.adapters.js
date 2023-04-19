const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findPlantelbyInfraestructura(req, reply) {
  try {
    const { infraestructuraId } = req.params;

    Logger.info('[planteles]: Getting planteles - infraestructura');
    const infraestructura = await this.institucionServices.findPlantelbyInfraestructura(
      { id: infraestructuraId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: infraestructura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findPlantelbyInfraestructura;
