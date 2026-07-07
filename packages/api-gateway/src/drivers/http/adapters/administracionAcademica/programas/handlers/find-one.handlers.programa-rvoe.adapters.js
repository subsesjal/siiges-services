const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findOneProgramaRvoe(req, reply) {
  try {
    Logger.info('[Programas]: Getting a program by RVOE');
    const { rvoe } = req.query;
    const programa = await this.administracionAcademicaServices.findOneProgramaRvoe({ rvoe });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programa });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneProgramaRvoe;
