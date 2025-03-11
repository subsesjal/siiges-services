const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudBecaAlumno(request, reply) {
  try {
    const { solicitudBecaAlumnoId } = request.params;
    const data = request.body;
    Logger.info('[SolicitudBeca]: update solicitud beca alumno');
    const solicitudBecaAlumno = await this.solicitudBecaServices
      .updateSolicitudBecaAlumno(data, { id: solicitudBecaAlumnoId });
    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudBecaAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSolicitudBecaAlumno };
