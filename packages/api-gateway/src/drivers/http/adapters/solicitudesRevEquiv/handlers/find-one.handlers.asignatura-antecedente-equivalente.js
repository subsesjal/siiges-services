const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneAsignaturaAntecedenteEquivalente(req, reply) {
  try {
    const { asignaturaAntecedenteEquivalenteId } = req.params;
    Logger.info('[SolicitudRevEquiv]: Getting Asignatura Antecedente Equivalente by ID');

    const solicitudRevEquiv = await this.solicitudRevEquivServices
      .findOneAsignaturaAntecedenteEquivalente({ id: asignaturaAntecedenteEquivalenteId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudRevEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneAsignaturaAntecedenteEquivalente;
