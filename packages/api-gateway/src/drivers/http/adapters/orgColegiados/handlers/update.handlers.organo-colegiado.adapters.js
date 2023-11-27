// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateOrgColegiado(request, reply) {
  try {
    const { orgColegiadoId } = request.params;
    const { ...data } = request.body;

    Logger.info('[Organo Colegiado]: update Organo Colegiado');

    const orgColegiado = await this.opdServices.updateOrgColegiado(
      { id: orgColegiadoId, data },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: orgColegiado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateOrgColegiado };
