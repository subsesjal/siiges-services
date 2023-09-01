const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllMunicipios(req, reply) {
  try {
    Logger.info('[municipios]: Getting municipios list');
    const { query } = req;
    const municipios = await this.institucionServices.findAllMunicipios({ query });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: municipios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllMunicipios;
