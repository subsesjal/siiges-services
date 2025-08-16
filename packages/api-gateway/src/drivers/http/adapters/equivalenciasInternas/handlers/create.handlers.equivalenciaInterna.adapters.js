const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createEquivalenciaInterna(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[Equivalencia]: creating Equivalencia Interna');
    const Equivalencia = await this.administracionAcademicaServices.createEquivalenciaInterna(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: Equivalencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createEquivalenciaInterna };
