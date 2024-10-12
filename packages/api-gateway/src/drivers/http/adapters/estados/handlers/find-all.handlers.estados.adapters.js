const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllEstados(req, reply) {
  try {
    Logger.info('[Estados]: Getting estados list');

    const estados = await this.institucionServices.findAllEstados();
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: estados });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllEstados;
