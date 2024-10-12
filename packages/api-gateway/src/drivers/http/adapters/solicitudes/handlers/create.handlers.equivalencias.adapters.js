const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const errorHandler = require('../../../utils/errorHandler');

async function createEquivalencia(req, reply) {
  try {
    const fotografia = req.body.FIRMA_REPRESENTANTE;
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

    const newEquivalencia = await this.solicitudServices.createEquivalencia(data, fotografia);
    const { id } = newEquivalencia.dataValues;
    const fileKeys = Object.keys(req.body).filter((key) => key !== 'DATA');
    await fileKeys.reduce(async (prevPromise, key) => {
      await prevPromise;
      const archivoAdjunto = fileData.find((files) => files.fieldname === key);
      if (!archivoAdjunto) {
        throw boom.badRequest('Archivo adjunto requerido.');
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
