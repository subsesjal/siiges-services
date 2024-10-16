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

    Logger.info('[equivalencia]: Creating equivalencia');
    const newEquivalencia = await this.solicitudServices.createEquivalencia({ data });
    const { id } = newEquivalencia.dataValues;
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

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newEquivalencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createEquivalencia;
