// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findOneInspectoresProgramas(request, reply) {
  try {
    const { inspectorId } = request.params;

    Logger.info('[api/inspectores-programas/find-one]: find one the inspector program');
    const inspectorPrograms = await this.inspeccionServices
      .findOneInspectoresProgramas({ inspectorId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspectorPrograms });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneInspectoresProgramas };
