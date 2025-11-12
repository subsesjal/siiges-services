const errorHandler = require('../../../utils/errorHandler');

const FEATURE = {
  EN_FIRMA: 3,
  PROCESADA: 4,
  ATENDER_OBSERVACIONES: 5,
};

const TIPO_TRAMITE_NOMBRES = {
  1: 'Equivalencia Parcial',
  2: 'Equivalencia Total',
  3: 'Revalidación Parcial',
  4: 'Revalidación Total',
  5: 'Revalidación Duplicado',
};

const NOTIFICATION_MAPPING = {
  [FEATURE.RECIBIDA]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Solicitud en Firma - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivRecibida',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
      },
    });
  },
  [FEATURE.EN_FIRMA]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Solicitud en Firma - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivEnFirma',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
      },
    });
  },
  [FEATURE.PROCESADA]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Solicitud Procesada - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivProcesada',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
      },
    });
  },
  [FEATURE.ATENDER_OBSERVACIONES]: async (processor, solicitud) => {
    const params = {
      folioSolicitud: solicitud.folioSolicitud,
      observaciones: solicitud.observaciones,
      tipoSolicitud: TIPO_TRAMITE_NOMBRES[solicitud.tipoTramiteId],
    };

    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Atender Observaciones - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivObservaciones',
      params,
    });
  },
};

async function sendNotificationEstatus(processor, estatus, solicitud) {
  const action = NOTIFICATION_MAPPING[estatus];
  if (!action) return;
  await action(processor, solicitud);
}

async function updateSolicitudRevEquiv(req, reply) {
  try {
    const data = req.body;
    const { solicitudRevEquivId } = req.params;
    const updatedEquiv = await this.solicitudRevEquivServices
      .updateSolicitudRevEquiv(data, { id: solicitudRevEquivId });

    // Enviar notificación si hay cambio de estatus
    if (solicitudRevEquivId) {
      const processor = this.notificacionServices.sendNotificationEmail;
      sendNotificationEstatus(processor, updatedEquiv.estatusSolicitudRevEquivId, updatedEquiv);
    }
    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updatedEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitudRevEquiv;
