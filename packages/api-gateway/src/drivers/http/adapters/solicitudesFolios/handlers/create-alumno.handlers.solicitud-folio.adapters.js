const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createAlumnoFolio(req, reply) {
  try {
    const { solicitudFolioId, alumnoId } = req.params;
    const { fechaTermino, fechaElaboracion } = req.body;

    Logger.info('[solicitudes]: Creating alumno folio');

    // Asegurar que solicitudFolioId y alumnoId no sean undefined
    if (!solicitudFolioId || !alumnoId) {
      return reply.code(400).send({ message: 'solicitudFolioId y alumnoId son requeridos.' });
    }

    // Verificar que el solicitudFolioId existe en la tabla solicitudes_folios
    const solicitudFolio = await this.solicitudFolioServices
      .findOneSolicitudFolio({ id: solicitudFolioId });
    if (!solicitudFolio) {
      return reply.code(404).send({ message: 'Solicitud folio no encontrado.' });
    }

    // Verificar que el alumnoId existe en la tabla alumnos
    Logger.info(`[Alumno]: Getting Alumno with id: ${alumnoId}`);
    const alumno = await this.administracionAcademicaServices.findOneAlumno({ id: alumnoId });
    if (!alumno) {
      return reply.code(404).send({ message: 'Alumno no encontrado.' });
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
