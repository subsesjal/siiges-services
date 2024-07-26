const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createAlumnoFolio(req, reply) {
  try {
    const { solicitudFolioId, alumnoId } = req.params;
    const { fechaTermino, fechaElaboracion } = req.body;

    // Verificar que el solicitudFolioId existe en la tabla solicitudes_folios
    Logger.info('[Solicitudes]: Creating alumno folio');
    const solicitudFolio = await this.solicitudFolioServices
      .findOneSolicitudFolio({ id: solicitudFolioId });

    // Verificar que el alumnoId existe en la tabla alumnos
    Logger.info(`[Alumno]: Getting Alumno with id: ${alumnoId}`);
    const alumno = await this.administracionAcademicaServices.findOneAlumno({ id: alumnoId });

    // Verificar si ya existe un registro con el mismo solicitudFolioId y alumnoId
    const existingAlumnoFolio = await this.solicitudFolioServices.findOneSolicitudFolioAlumno({
      alumnoId,
      solicitudFolioId,
    });

    if (existingAlumnoFolio) {
      return reply.code(400).send({ message: 'Ya existe un registro con este solicitudFolioId y alumnoId.' });
    }

    // Crear el registro en solicitudes_folios_alumnos
    const alumnoFolio = await this.solicitudFolioServices.createAlumnoFolio({
      solicitudFolioId,
      alumnoId,
      fechaTermino,
      fechaElaboracion,
    });

    // Incluir las relaciones en la respuesta
    const response = {
      ...alumnoFolio.dataValues,
      alumno: {
        id: alumno.id,
        persona: alumno.persona,
      },
    };

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: response });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createAlumnoFolio };
