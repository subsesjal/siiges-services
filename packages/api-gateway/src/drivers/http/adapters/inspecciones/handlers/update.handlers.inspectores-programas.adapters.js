// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateInspectoresProgramas(request, reply) {
  try {
    const { id } = request.params;
    const { body } = request;

    Logger.info('[api/inspectores-programas/update/:id]: update a inspector program');
    const inspectorPrograms = await this
      .inspeccionServices.updateInspectoresProgramas({ id, body });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspectorPrograms });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateInspectoresProgramas };
