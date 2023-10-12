const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteSaludInstitucion(req, reply) {
  try {
    const { plantelId, saludInstitucionId } = req.params;

    Logger.info(`[Salud institución]: delete salud-institucion ${saludInstitucionId}`);

    const saludInstitucionDeleted = await this.institucionServices
      .deleteSaludInstitucion({
        plantelId,
        saludInstitucionId,
      });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: saludInstitucionDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteSaludInstitucion };
