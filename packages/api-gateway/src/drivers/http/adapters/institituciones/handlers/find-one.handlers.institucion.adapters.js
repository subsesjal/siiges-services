const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Getting institución ${institucionId}`);
    const institucion = await this.institucionServices.findOneInstitucion({ id: institucionId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneInstitucion;
