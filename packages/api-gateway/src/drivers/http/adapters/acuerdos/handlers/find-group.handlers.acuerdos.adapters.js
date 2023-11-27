// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findGroupAcuerdos(request, reply) {
  try {
    const { organoColegiadoId } = request.params;

    Logger.info('[Acuerdos]: find group acuerdos');
    const acuerdo = await this.opdServices
      .findGroupAcuerdos({ organoColegiadoId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: acuerdo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findGroupAcuerdos };
