const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const errorHandler = require('../../../utils/errorHandler');
const FILES_MAPPING = [
  'ARCHIVO_CURP',
  'ARCHIVO_NACIMIENTO',
  'ARCHIVO_CERTIFICADO',
  'PROGRAMA_AUTORIZADO',
  'IDENTIFICACION_OFICIAL',
  'RESOLUCION',
  'ANTECEDENTE_ACADEMICO',
  'PROPUESTA',
  'COMPROBANTE_PAGO_TRAMITE',
];

async function createEquivalencia(req, reply) {
  try {
    // Acceder al archivo desde el campo "FILE" y a los datos desde "DATA"
    const fotografia = req.body.FIRMA_REPRESENTANTE; // Aquí accedemos directamente a FILE
    const dataField = req.body.DATA; // Accedemos al contenido de DATA
    //console.log(req.body);
    // if (!fotografia || !dataField) {
    //   return reply
    //     .code(400)
    //     .send({ message: 'Datos insuficientes: asegúrate de que se incluyan el archivo y los datos.' });
    // }

    // Parsear el JSON de DATA.value
    const data2 = await req.saveRequestFiles();
    console.log(data2);
    let data;
    try {
      data = JSON.parse(dataField.value); // Accedemos al valor del campo DATA
    } catch (error) {
      console.error('Error al parsear los datos JSON:', error);
      return reply
        .code(400)
        .send({ message: 'Error al parsear los datos JSON en el campo DATA.' });
    }

    Logger.info('[equivalencia]: Creating equivalencia');

    // Llamamos al servicio con los datos parseados y el archivo
    const newEquivalencia = await this.solicitudServices.createEquivalencia(data, fotografia);
    const { id } = newEquivalencia.dataValues;

    // const filesSaved = FILES_MAPPING.map((fileName) => {
    //   console.log(fileName);
    //   uploadFile(req, fileName, id);
    // });
    const fileKeys = Object.keys(req.body).filter((key) => key !== 'DATA');
    fileKeys.forEach(async (key) => {
      console.log(key);
      const archivoAdjunto = data2.find((files) => files.fieldname === key);
      if (!archivoAdjunto) {
        throw boom.badRequest('Archivo adjunto requerido.');
      }
      const dataFile = {
        tipoEntidad: 'SOLICITUD_REV_EQUIV',
        entidadId: id,
        tipoDocumento: key,
      };

      this.filesServices.uploadFile(dataFile, archivoAdjunto);
    });
    // const data2 = await req.saveRequestFiles();
    // const fileKeys = Object.keys(req.body).filter((key) => key !== 'DATA');

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newEquivalencia });
  } catch (error) {
    console.error(error);
    return errorHandler(error, reply);
  }
}

module.exports = createEquivalencia;
