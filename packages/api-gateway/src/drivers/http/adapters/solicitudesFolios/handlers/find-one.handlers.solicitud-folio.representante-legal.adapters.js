const { Logger } = require('@siiges-services/shared');
const axios = require('axios');
const { config } = require('../../../../../../../solicitudesFolios/config/environment');
const errorHandler = require('../../../utils/errorHandler');

async function findOneRepresentanteLegal(req, reply) {
  try {
    const { curp } = req.params;
    Logger.info(`[representante-legal] Consultando CURP: ${curp}`);

    const { baseUrl, apiKey } = config.apiTitulos;

    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/representantes-legales/${encodeURIComponent(curp)}`,
      headers: { 'x-api-key': apiKey },
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: response.data });
  } catch (error) {
    if (error.response) {
      return reply
        .code(error.response.status)
        .send({ message: error.response.data?.message || error.message });
    }
    return errorHandler(error, reply);
  }
}

module.exports = { findOneRepresentanteLegal };
