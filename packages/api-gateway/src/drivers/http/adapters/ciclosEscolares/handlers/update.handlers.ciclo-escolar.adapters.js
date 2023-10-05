// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateCicloEscolar(request, reply) {
  try {
    const { cicloEscolarId } = request.params;
    const { ...data } = request.body;

    Logger.info('[Ciclo escolar]: update Ciclo Escolar');

    const cicloEscolar = await this.administracionAcademicaServices.updateCicloEscolar(
      { id: cicloEscolarId, data },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: cicloEscolar });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateCicloEscolar };
