const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const errorHandler = require('../../../utils/errorHandler');

const FILE_KEYS_MAPPING = {
  ARCHIVO_CURP: 'ARCHIVO_CURP',
  ARCHIVO_NACIMIENTO: 'ARCHIVO_NACIMIENTO',
  ARCHIVO_CERTIFICADO: 'ARCHIVO_CERTIFICADO',
  PROGRAMA_AUTORIZADO: 'PROGRAMA_AUTORIZADO',
  IDENTIFICACION_OFICIAL: 'IDENTIFICACION_OFICIAL',
  RESOLUCION: 'RESOLUCION',
  ANTECEDENTE_ACADEMICO: 'ANTECEDENTE_ACADEMICO',
  PROPUESTA: 'PROPUESTA',
  COMPROBANTE_PAGO_TRAMITE: 'COMPROBANTE_PAGO_TRAMITE',
};

const TIPO_TRAMITE_NOMBRES = {
  1: 'Equivalencia Parcial',
  2: 'Equivalencia Total',
  3: 'Revalidación Parcial',
  4: 'Revalidación Total',
  5: 'Revalidación Duplicado',
};

async function createEquivalencia(req, reply) {
  try {
    const dataField = req.body.DATA;
    const fileData = await req.saveRequestFiles();
    let data;
    try {
      data = JSON.parse(dataField.value);
    } catch (error) {
      return reply
        .code(400)
        .send({ message: 'Error al parsear los datos JSON en el campo DATA.' });
    }
    Logger.info('[SolicitudRevEquiv]: Creating SolicitudRevEquiv');
    const newEquivalencia = await this.solicitudRevEquivServices.createSolicitudRevEquiv({ data });
    const { id } = newEquivalencia;

    const fileKeys = Object.keys(req.body)
      .filter((key) => Object.prototype.hasOwnProperty.call(FILE_KEYS_MAPPING, key) && key !== 'DATA');

    await fileKeys.reduce(async (prevPromise, key) => {
      await prevPromise;
      const archivoAdjunto = fileData.find((files) => files.fieldname === key);
      if (!archivoAdjunto) {
        throw boom.badRequest('Archivo adjunto requerido para: ', key);
      }
      const dataFile = {
        tipoEntidad: 'SOLICITUD_REV_EQUIV',
        entidadId: id,
        tipoDocumento: key,
      };
      await this.filesServices.uploadFile(dataFile, archivoAdjunto);
    }, Promise.resolve());

    // Enviar notificación de solicitud recibida
    try {
      await this.notificacionServices.sendNotificationEmail({
        usuarioId: 212,
        email: newEquivalencia.interesado.persona.correoPrimario,
        asunto: `SIIGES: Solicitud Recibida - Folio ${newEquivalencia.folioSolicitud}`,
        template: 'solicitudRevEquivRecibida',
        params: {
          folioSolicitud: newEquivalencia.folioSolicitud,
          tipoSolicitud: TIPO_TRAMITE_NOMBRES[newEquivalencia.tipoTramiteId] || 'Equivalencia',
        },
      });
      Logger.info(`[SolicitudRevEquiv]: Correo enviado exitosamente a ${newEquivalencia.interesado.persona.correoPrimario}`);
    } catch (emailError) {
      // Log del error pero no detener el proceso
      Logger.error('[SolicitudRevEquiv]: Error al enviar correo de notificación:', emailError);
    }

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newEquivalencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}
module.exports = createEquivalencia;
