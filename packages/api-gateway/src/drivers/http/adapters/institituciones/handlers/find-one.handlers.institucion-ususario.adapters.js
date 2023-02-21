const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneInstitucionUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;

    Logger.info(`[instituciones]: Getting institución by usuario ${usuarioId}`);
    const institucion = await this.institucionServices.findOneInstitucionUsuario({ usuarioId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneInstitucionUsuario;
