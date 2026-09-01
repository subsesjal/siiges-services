const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findInstitucionesByMunicipio(req, reply) {
  try {
    Logger.info('[Instituciones Public]: Getting instituciones by municipio');
    const { municipioId } = req.query;

    const instituciones = await this.institucionServices
      .findInstitucionesByMunicipio({ municipioId: Number(municipioId) });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: instituciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findInstitucionesByMunicipio };
