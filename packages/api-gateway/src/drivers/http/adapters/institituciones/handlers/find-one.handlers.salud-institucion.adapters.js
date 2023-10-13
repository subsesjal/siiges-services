const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSaludInstituciones(req, reply) {
  try {
    Logger.info('[institución salud]: Get one saludInstituciones');

    const { saludInstitucionId, plantelId } = req.params;

    const saludInstituciones = await this.institucionServices
      .findOneSaludInstituciones({
        saludInstitucionId,
        plantelId,
      });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: saludInstituciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSaludInstituciones };
