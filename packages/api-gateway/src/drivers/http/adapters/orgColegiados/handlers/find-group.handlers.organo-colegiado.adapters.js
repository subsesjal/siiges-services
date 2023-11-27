// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findGroupOrgColegiados(request, reply) {
  try {
    const { institucionId } = request.params;

    Logger.info('[Organos Colegiados]: find group organos colegiados');
    const orgColegiados = await this.opdServices
      .findGroupOrgColegiados({ institucionId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: orgColegiados });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findGroupOrgColegiados };
