const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createInstitucionDgp(req, reply) {
  try {
    Logger.info('[InstitucionesDgp]: Getting InstitucionesDgp list');
    const data = req.body;
    const instituciones = await this.institucionServices.createOneInstitucionesDgp(data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: instituciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInstitucionDgp;
