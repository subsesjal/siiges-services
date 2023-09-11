const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findPlantelSaludInstituciones(req, reply) {
  try {
    Logger.info('[institución salud]: Get all list institucion-salud');

    const { plantelId } = req.params;
    const getAllSaludInstitucion = await this.institucionServices
      .findPlantelSaludInstituciones({ plantelId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: getAllSaludInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findPlantelSaludInstituciones };
