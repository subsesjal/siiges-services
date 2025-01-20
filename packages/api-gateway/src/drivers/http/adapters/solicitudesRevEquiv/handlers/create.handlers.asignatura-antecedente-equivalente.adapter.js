const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudAntecedente(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes]: Creating solicitud de antecedentes de asignaturas');

    const solicitudAntecedente = await this.solicitudAntecedenteServices
      .createSolicitudAntecedente(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudAntecedente });
  } catch (error) {
    Logger.error('[solicitudes]: Error creating solicitud de antecedentes', error);
    return errorHandler(error, reply);
  }
}

module.exports = createSolicitudAntecedente;
