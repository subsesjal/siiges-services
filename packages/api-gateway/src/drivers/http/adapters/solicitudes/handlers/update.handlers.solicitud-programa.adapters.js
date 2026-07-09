const { Logger } = require('@siiges-services/shared');
const { config } = require('@siiges-services/notificaciones');
const errorHandler = require('../../../utils/errorHandler');

const ESTATUS_REVISION_DOCUMENTACION = 2;

async function sendEmailSolicitudTerminada(
  notificacionServices,
  institucionServices,
  solicitud,
  usuario,
) {
  Logger.info('[notification]: Sending solicitud terminada notification');

  let nombreInstitucion = '';
  try {
    const institucion = await institucionServices.findOneInstitucionUsuario({
      usuarioId: usuario.dataValues.id,
    });
    nombreInstitucion = institucion?.dataValues?.nombre || '';
  } catch (error) {
    Logger.warn('[notification]: no se encontró institución para el correo de solicitud terminada');
  }

  await notificacionServices.sendNotificationEmail({
    usuarioId: usuario.dataValues.id,
    email: config.emailDireccionIncorporacion,
    bcc: config.emailSoporteSiiges,
    asunto: 'SIGES: Solicitud enviada a revisión de documentación',
    template: 'solicitudTerminada',
    params: {
      nombre_usuario: usuario.dataValues.usuario,
      folio: solicitud.dataValues.folio || '',
      nombre_programa: solicitud.dataValues.programa?.nombre || '',
      nombre_institucion: nombreInstitucion,
      fecha_completado: new Date().toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' }),
      estatus: 'REVISIÓN DE DOCUMENTACIÓN',
      anio: new Date().getFullYear(),
    },
  });
}

async function updateSolicitudPrograma(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudId } = req.params;

    Logger.info('[solicitudes]: Updating solicitud');

    const solicitud = await this.solicitudServices.updateSolicitudPrograma(
      { id: solicitudId },
      data,
    );
    const usuario = await this.usuarioServices.findOneUser({ id: solicitud.dataValues.usuarioId });

    const estatusSolicitudId = Number(
      data.estatusSolicitudId ?? data.programa?.estatusSolicitudId,
    );
    if (estatusSolicitudId === ESTATUS_REVISION_DOCUMENTACION) {
      sendEmailSolicitudTerminada(
        this.notificacionServices,
        this.institucionServices,
        solicitud,
        usuario,
      );
    }

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitudPrograma;
