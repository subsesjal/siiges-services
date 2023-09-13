const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findPlantelProgramas(req, reply) {
  try {
    Logger.info('[Programas]: Getting programs list by platelId');
    const { plantelId } = req.params;
    const programs = await this.administracionAcademicaServices.findPlantelProgramas({ plantelId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programs });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findPlantelProgramas;
