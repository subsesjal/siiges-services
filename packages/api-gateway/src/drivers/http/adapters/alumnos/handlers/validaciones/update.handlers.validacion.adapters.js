const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updateAlumnoValidacion(req, reply) {
  try {
    const { observaciones, ...data } = req.body;
    const { alumnoId } = req.params;

    Logger.info(`[Alumno]: Actualizando validación para alumno ${alumnoId}`);

    const alumnoValidacion = await this.administracionAcademicaServices.updateAlumnoValidacion({
      alumnoId,
      ...data,
      observaciones,
    });

    // Enviar notificación si hay observaciones
    if (observaciones) {
      this.notificacionServices.sendNotificationEmail({
        usuarioId: 14,
        email: 'joel.duran@jalisco.gob.mx',
        asunto: 'SIIGES: Atender observaciones de validación de alumno',
        template: 'alumnoValidacionObservaciones',
        params: {
          observaciones,
        },
      });
    }

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnoValidacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateAlumnoValidacion };
