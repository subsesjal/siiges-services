const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupPlantelesUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;

    Logger.info(`[usuarios]: Getting planteles list given user id ${usuarioId}`);

    const plantelesUsuario = await this.solicitudServices.findGroupPlantelesUsuario(
      { usuarioId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelesUsuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupPlantelesUsuario;
