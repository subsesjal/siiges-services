const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

const FEATURE = {
  LISTA_PARA_ENTREGA: 3,
  ATENDER_OBSERVACIONES: 4,
};

const NOTIFICATION_MAPPING = {
  [FEATURE.LISTA_PARA_ENTREGA]: async (processor, solicitudServSoc) => {
    const { folioSolicitud, url } = solicitudServSoc.dataValues;
    await processor({
      usuarioId: solicitudServSoc.usuario.id,
      email: solicitudServSoc.usuario.correo,
      asunto: `SIGES: Confirmación de Solicitud de Servicio Social con Folio ${folioSolicitud}`,
      template: 'reporteSolicitudServicioSocial',
      params: {
        folioSolicitud,
        url,
        link: url,
      },
    });
  },
  [FEATURE.ATENDER_OBSERVACIONES]: async (processor, solicitudServSoc) => {
    await processor({
      usuarioId: solicitudServSoc.usuario.id,
      email: solicitudServSoc.usuario.correo,
      asunto: `SIGES: Atender Observaciones - Solicitud de Servicio Social con Folio ${solicitudServSoc.folioSolicitud}`,
      template: 'observacionesSolicitudServicioSocial',
      params: {
        solicitudServSoc,
      },
    });
  },
};

async function sendNotificationReport(processor, estatusSolicitud, solicitudServSoc) {
  const action = NOTIFICATION_MAPPING[estatusSolicitud];
  if (!action) return;
  await action(processor, solicitudServSoc);
}

async function updateSolicitudServSoc(req, reply) {
  try {
    const data = req.body;
    const { solicitudServicioSocialId } = req.params;

    Logger.info('[solicitudes Serv Soc]: Updating solicitud Serv Soc');

    const solicitudServSoc = await this.solicitudServicioSocialServices
      .updateSolicitudServSoc(data, { id: solicitudServicioSocialId });

    const { estatusSolicitudServicioSocialId } = data;

    if (estatusSolicitudServicioSocialId === FEATURE.LISTA_PARA_ENTREGA) {
      const valueData = {
        tipoEntidad: 'SOLICITUD_SERV_SOC',
        tipoDocumento: 'REPORTE_SERV_SOC',
        entidadId: solicitudServicioSocialId,
      };
      const identifierObj = await this.filesServices.getFileIdentifierObj(valueData);
      const file = await this.filesServices.findOneFile(identifierObj, null, null, true);
      solicitudServSoc.dataValues.url = file.url;
    }

    const processor = this.notificacionServices.sendNotificationEmail;
    await sendNotificationReport(processor, estatusSolicitudServicioSocialId, solicitudServSoc);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSolicitudServSoc };
