// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findOneAcuerdo(request, reply) {
  try {
    const { acuerdoId } = request.params;

    Logger.info('[Acuerdos]: find one Acuerdo');

    const acuerdo = await this.opdServices.findOneAcuerdo(
      { id: acuerdoId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: acuerdo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneAcuerdo };
