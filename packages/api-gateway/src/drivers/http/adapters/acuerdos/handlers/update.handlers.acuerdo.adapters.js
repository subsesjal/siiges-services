// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateAcuerdo(request, reply) {
  try {
    const { acuerdoId } = request.params;
    const { ...data } = request.body;

    Logger.info('[Organo Colegiado]: update Organo Colegiado');

    const acuerdo = await this.opdServices.updateAcuerdo(
      { id: acuerdoId, data },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: acuerdo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateAcuerdo };
