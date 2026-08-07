const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updateManyProgramas(request, reply) {
  try {
    Logger.info('[Programa]: update many Programas');
    const programas = await this.administracionAcademicaServices
      .updateManyProgramas(request.body);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateManyProgramas;
