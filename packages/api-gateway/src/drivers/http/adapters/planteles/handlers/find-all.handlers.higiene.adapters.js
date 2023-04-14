const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllHigiene(req, reply) {
  try {
    Logger.info('[higiene]: Getting higiene list');
    const higiene = await this.institucionServices.findAllHigiene();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: higiene });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllHigiene;
