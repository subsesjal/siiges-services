const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findPlantelesInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Getting institucion with id ${institucionId} and its planteles list`);

    const plantelesInstitucion = await this.institucionServices.findPlantelesInstitucion(
      { id: institucionId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelesInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findPlantelesInstitucion;
