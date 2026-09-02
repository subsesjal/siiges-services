const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findPlantelesByInstitucionPublic(req, reply) {
  try {
    Logger.info('[Planteles Public]: Getting planteles by institucion');
    const { institucionId } = req.params;

    const planteles = await this.institucionServices
      .findPlantelesByInstitucionPublic({ institucionId: Number(institucionId) });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: planteles });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findPlantelesByInstitucionPublic };
