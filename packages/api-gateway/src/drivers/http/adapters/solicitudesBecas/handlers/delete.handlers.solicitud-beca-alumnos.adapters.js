const errorHandler = require('../../../utils/errorHandler');

async function deleteSolicitudBecaAlumno(req, reply) {
  try {
    const { solicitudBecaAlumnoId } = req.params;
    const becaEliminadaAlumno = await this.solicitudBecaAlumnoServices.deleteSolicitudBecaAlumno(
      { id: solicitudBecaAlumnoId },
    );
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: becaEliminadaAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}
module.exports = { deleteSolicitudBecaAlumno };
