const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateInstitucion(req, reply) {
  try {
    Logger.info('[instituciones]: Updating institucion');

    const { institucionId } = req.params;
    const { ...data } = req.body;

    const institucionUpdated = await this.institucionServices.updateInstitucion(
      { id: institucionId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucionUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateInstitucion;
