const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updateAlumnoValidacion(req, reply) {
  try {
    const { observaciones, ...data } = req.body;
    const { alumnoId } = req.params;

    Logger.info(`[Validacion]: Updating validacion - alumno ${alumnoId}`);

    const alumnoValidacion = await this.administracionAcademicaServices.updateAlumnoValidacion({
      alumnoId,
      ...data,
      observaciones,
    });

    const notificationData = alumnoValidacion.toJSON();
    const alumno = notificationData?.alumno || {};
    const programa = alumno?.programa || {};
    const institucion = programa?.plantel?.institucion || {};
    const usuario = programa?.plantel?.institucion?.usuario || {};

    if (observaciones) {
      this.notificacionServices.sendNotificationEmail({
        usuarioId: usuario?.id,
        email: usuario?.correo,
        asunto: `SIIGES: Atender observaciones de validación de alumno con matrícula ${alumno?.matricula}`,
        template: 'alumnoValidacionObservaciones',
        params: {
          matricula: alumno?.matricula,
          nombreInstitucion: institucion?.nombre,
          nombrePrograma: programa?.nombre,
          rvoe: programa?.acuerdoRvoe,
          nombreAlumno: `${alumno?.persona?.nombre} ${alumno?.persona?.apellidoPaterno} ${alumno?.persona?.apellidoMaterno}`,
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
