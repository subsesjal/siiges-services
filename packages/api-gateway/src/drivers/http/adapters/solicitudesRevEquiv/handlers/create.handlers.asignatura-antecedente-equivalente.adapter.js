const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createAsignaturaAntecedenteEquivalente(req, reply) {
  try {
    const data = req.body;

    Logger.info('[solicitudes-rev-equiv]: Create asignatura antecedente equivalente');

    const asignaturaAntecedenteEquivalente = await this.solicitudRevEquivServices
      .createAsignaturaAntecedenteEquivalente(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignaturaAntecedenteEquivalente });
  } catch (error) {
    Logger.error('[solicitudes]: Error creating solicitud de antecedentes', error);
    return errorHandler(error, reply);
  }
}

module.exports = createAsignaturaAntecedenteEquivalente;
