const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function asignacionFolioAlumno(req, reply) {
  try {
    const { solicitudFolioId } = req.params;

    Logger.info('[solicitudes-folios]: Assing folios Alumnos');
    const foliosAlumnos = await this.solicitudFolioServices.assignFoliosAlumnos(
      { id: solicitudFolioId },
    );

    Logger.info('[solicitudes]: Getting solicitud folio');
    const solicitudFolio = await this.solicitudFolioServices.findOneSolicitudFolio(
      { id: solicitudFolioId },
    );

    Logger.info('[notification]: Sending notification');
    this.notificacionServices.sendNotificationEmail({
      usuarioId: solicitudFolio?.programa?.plantel?.institucion?.usuario?.id,
      email: solicitudFolio?.programa?.plantel?.institucion?.usuario?.correo,
      asunto: 'SIIGES: Folios de documentos asignados',
      template: 'folioDocumentosAlumnos',
      params: {
        email: solicitudFolio?.programa?.plantel?.institucion?.usuario?.correo,
        usuario: solicitudFolio?.programa?.plantel?.institucion?.usuario?.usuario,
        nombre: solicitudFolio?.programa?.plantel?.institucion?.nombre,
        folioSolicitud: solicitudFolio.folioSolicitud,
        programa: solicitudFolio?.programa?.nombre,
        nivel: solicitudFolio?.programa?.nivel?.descripcion,
        rvoe: solicitudFolio?.programa?.acuerdoRvoe,
        tipoDocumento: solicitudFolio?.tipoDocumento?.nombre,
        tipoSolicitudFolio: solicitudFolio?.tipoSolicitudFolio?.nombre,
        foliosAlumnos,
      },
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: foliosAlumnos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { asignacionFolioAlumno };
