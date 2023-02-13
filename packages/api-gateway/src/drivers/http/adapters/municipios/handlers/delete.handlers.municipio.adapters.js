const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteMunicipios(req, reply) {
  try {
    const { municipioId } = req.params;
    Logger.info('[municipios]: delete municipio');
    const municipios = await this.institucionServices.deleteMunicipios({
      id: municipioId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: municipios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteMunicipios;
