const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Deleting institucion: ${institucionId}`);
    const institucionDeleted = await this.institucionServices.deleteInstitucion({
      id: institucionId,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucionDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteInstitucion;
