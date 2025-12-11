const errorHandler = require('../../../utils/errorHandler');

const FEATURE = {
  RECIBIDA: 1,
  EN_FIRMA: 3,
  PROCESADA: 4,
  ATENDER_OBSERVACIONES: 5,
  CANCELADA: 6,
};

const TIPO_TRAMITE_NOMBRES = {
  1: 'Equivalencia Parcial',
  2: 'Equivalencia Total',
  3: 'Revalidación Parcial',
  4: 'Revalidación Total',
  5: 'Equivalencia Duplicado',
  6: 'Revalidación Duplicado',
  7: 'N/A',
};

const NOTIFICATION_MAPPING = {
  [FEATURE.RECIBIDA]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Solicitud Recibida - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivRecibida',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
        tipoSolicitud: TIPO_TRAMITE_NOMBRES[solicitud.tipoTramiteId] || 'Equivalencia',
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
        tipoSolicitud: TIPO_TRAMITE_NOMBRES[solicitud.tipoTramiteId] || 'Equivalencia',
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
        tipoSolicitud: TIPO_TRAMITE_NOMBRES[solicitud.tipoTramiteId] || 'Equivalencia',
      },
    });
  },
  [FEATURE.ATENDER_OBSERVACIONES]: async (processor, solicitud) => {
    const params = {
      folioSolicitud: solicitud.folioSolicitud,
      observaciones: solicitud.observaciones,
      tipoSolicitud: TIPO_TRAMITE_NOMBRES[solicitud.tipoTramiteId] || 'Equivalencia',
    };
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Atender Observaciones - RevEquiv ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivObservaciones',
      params,
    });
  },
  [FEATURE.CANCELADA]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIIGES: Solicitud Cancelada - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivCancelada',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
        tipoSolicitud: TIPO_TRAMITE_NOMBRES[solicitud.tipoTramiteId] || 'Equivalencia',
      },
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
