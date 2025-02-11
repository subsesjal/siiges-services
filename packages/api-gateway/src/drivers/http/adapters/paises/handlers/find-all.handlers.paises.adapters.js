const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllPaises(req, reply) {
  try {
    Logger.info('[Paises]: Getting paises list');

    const paises = await this.institucionServices.findAllPaises();
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: paises });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllPaises;
