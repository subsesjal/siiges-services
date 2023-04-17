const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deletePlantelHigiene(req, reply) {
  try {
    const { plantelId, higieneId } = req.params;

    Logger.info('[api/higiene/delete]: deleting link between plantel and higiene');
    const plantelHigieneDeleted = await this.institucionServices.deletePlantelHigiene({
      plantelId,
      higieneId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelHigieneDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deletePlantelHigiene;
