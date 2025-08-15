// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateEquivalenciaInterna(request, reply) {
  try {
    const { equivalenciaId } = request.params;
    const { ...data } = request.body;

    Logger.info('[Equivalencia]: update Equivalencia');

    const Equivalencia = await this.administracionAcademicaServices.updateEquivalenciaInterna(
      { id: equivalenciaId, data },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: Equivalencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateEquivalenciaInterna };
