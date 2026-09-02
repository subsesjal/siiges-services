const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findRvoePublic(req, reply) {
  try {
    Logger.info('[RVOE Public]: Searching RVOEs');
    const { plantelId } = req.query;

    const data = await this.administracionAcademicaServices
      .findRvoePublic({ plantelId: Number(plantelId) });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findRvoePublic,
};
