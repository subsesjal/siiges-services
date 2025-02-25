const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllNiveles(req, reply) {
  try {
    Logger.info('[Niveles]: Getting niveles list');

    const niveles = await this.institucionServices.findAllNiveles();
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: niveles });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllNiveles;
