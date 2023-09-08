const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findInstitucionProgramas(req, reply) {
  try {
    Logger.info('[Programas]: Getting programs list by institucionId');
    const { institucionId } = req.params;
    const programs = await this.administracionAcademicaServices
      .findInstitucionProgramas({ institucionId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programs });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findInstitucionProgramas;
