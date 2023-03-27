const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createHigiene(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[api/higiene/create]: creating the higiene');
    const higiene = await this.solicitudServices.createhigiene(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: higiene });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createHigiene;
