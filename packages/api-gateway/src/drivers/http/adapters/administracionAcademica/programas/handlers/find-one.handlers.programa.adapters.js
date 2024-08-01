const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findOnePrograma(req, reply) {
  try {
    Logger.info('[Programas]: Getting a program by programaId');
    const { programaId } = req.params;
    const programa = await this.administracionAcademicaServices.findOnePrograma({ id: programaId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programa });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOnePrograma;
