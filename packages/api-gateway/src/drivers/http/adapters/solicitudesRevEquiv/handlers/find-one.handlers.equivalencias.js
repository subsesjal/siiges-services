const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneEquivalencia(req, reply) {
  try {
    const { equivalenciaId } = req.params;

    Logger.info('[solicitudes]: Getting solicitud - equivalencia');
    const equivalencia = await this.solicitudServices.findOneEquivalencia(
      { id: equivalenciaId },
    );
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: equivalencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneEquivalencia;
