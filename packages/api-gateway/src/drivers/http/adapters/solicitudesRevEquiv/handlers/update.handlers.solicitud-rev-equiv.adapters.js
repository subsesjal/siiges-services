const errorHandler = require('../../../utils/errorHandler');

const FEATURE = {
  EN_FIRMA: 3,
  PROCESADA: 4,
  ATENDER_OBSERVACIONES: 5,
};

const NOTIFICATION_MAPPING = {
  [FEATURE.RECIBIDA]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIGES: Solicitud en Firma - Folio ${solicitud.folioSolicitud}`,
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
      asunto: `SIGES: Solicitud en Firma - Folio ${solicitud.folioSolicitud}`,
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
      asunto: `SIGES: Solicitud Procesada - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivProcesada',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
      },
    });
  },
  [FEATURE.ATENDER_OBSERVACIONES]: async (processor, solicitud) => {
    await processor({
      usuarioId: 212,
      email: solicitud.interesado.persona.correoPrimario,
      asunto: `SIGES: Atender Observaciones - Folio ${solicitud.folioSolicitud}`,
      template: 'solicitudRevEquivObservaciones',
      params: {
        folioSolicitud: solicitud.folioSolicitud,
        observaciones: solicitud.observaciones,
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

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updatedEquiv });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitudRevEquiv;
