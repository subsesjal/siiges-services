const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateHigiene(req, reply) {
  try {
    Logger.info('[higiene]: Updating higiene');

    const { higieneId } = req.params;
    const { ...data } = req.body;

    const higieneUpdated = await this.institucionServices.updateHigiene(
      { id: higieneId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: higieneUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateHigiene;
