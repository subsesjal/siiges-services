const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteSaludInstitucion(req, reply) {
  try {
    const { institucionesSaludId } = req.params;

    Logger.info(`[Salud institución]: delete salud-institucion ${institucionesSaludId}`);

    const saludInstitucionDeleted = await this.institucionServices
      .deleteSaludInstitucion({ id: institucionesSaludId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: saludInstitucionDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteSaludInstitucion };
