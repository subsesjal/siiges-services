const errorHandler = require('../../../utils/errorHandler');

async function findOneAlumno(req, reply) {
  try {
    const { id } = req.params;
    const alumno = await this.solicitudFolioServices.findOneAlumno({ id });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneAlumno };
