const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllHigienes(req, reply) {
  try {
    Logger.info('[higiene]: Getting higienes list');
    const higienes = await this.institucionServices.findAllHigienes();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: higienes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllHigienes;
