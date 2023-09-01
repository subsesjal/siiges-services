// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function deleteInspectoresProgramas(request, reply) {
  try {
    const { id } = request.params;

    Logger.info('[api/inspectores-programas/delete]: deleting the inspector program');
    const inspectorPrograms = await this.inspeccionServices.deleteInspectoresProgramas({ id });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspectorPrograms });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteInspectoresProgramas };
