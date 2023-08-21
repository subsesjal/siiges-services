const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllEdificiosNiveles(req, reply) {
  try {
    Logger.info('[edificios_niveles]: Getting edificios niveles list');
    const edificiosNiveles = await this.institucionServices.findAllEdificiosNiveles();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: edificiosNiveles });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllEdificiosNiveles;
