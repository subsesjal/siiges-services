const errorHandler = require('../../../utils/errorHandler');

async function deleteSolicitudBecaAlumno(req, reply) {
  try {
    const { solicitudBecaId } = req.params;
    const becaEliminadaAlumno = await this.solicitudBecaServices.deleteSolicitudBecaAlumno(
      { id: solicitudBecaId },
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
