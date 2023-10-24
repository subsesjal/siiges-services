// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findAllGrados(request, reply) {
  try {
    Logger.info('[Grados]: find list of grados');
    const grados = await this.administracionAcademicaServices
      .findAllGrados();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: grados });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllGrados };
