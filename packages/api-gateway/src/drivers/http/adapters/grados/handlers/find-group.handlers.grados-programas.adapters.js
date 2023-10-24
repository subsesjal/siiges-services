// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findGroupGrados(request, reply) {
  try {
    Logger.info('[Grados]: find list of grados');
    const { programaId } = request.params;
    const grados = await this.administracionAcademicaServices
      .findGroupGrados({ programaId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: grados });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findGroupGrados };
