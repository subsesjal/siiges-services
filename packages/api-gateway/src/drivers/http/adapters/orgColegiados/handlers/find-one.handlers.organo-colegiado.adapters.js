// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findOneOrgColegiado(request, reply) {
  try {
    const { orgColegiadoId } = request.params;

    Logger.info('[Organo Colegiado]: find one Organos Colegiado');

    const orgColegiado = await this.opdServices.findOneOrgColegiado(
      { id: orgColegiadoId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: orgColegiado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneOrgColegiado };
