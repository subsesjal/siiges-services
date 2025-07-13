const { Logger } = require('@siiges-services/shared');
const { buildFileFDA01 } = require('../db/FDA');
const { findFileFDA02 } = require('../db/FDA');
const { findFileFDA03 } = require('../db/FDA');
const { findFileFDA04 } = require('../db/FDA');
const { findFileFDA05 } = require('../db/FDA');
const { findFileFDA06 } = require('../db/FDA');
const { findFileFDP01 } = require('../db/FDP');
const { findFileFDP02 } = require('../db/FDP');
const { findFileFDP05 } = require('../db/FDP');
const { findFileFDP06 } = require('../db/FDP');
const { findFileOFAD } = require('../db/OFAD');
const { findFileRVOE } = require('../db/RVOE');
const { findFileHistorial, findFileBeca, findFileServicio } = require('../db/FSE');
const { createFileXML, findFileTitulo } = require('../db/TITULO_ELECTRONICO');

/**
 * Objeto `filesFDA` que contiene funciones para encontrar archivos FDA específicos.
 * Cada propiedad del objeto representa un código de archivo FDA y
 * está asociada a una función asíncrona
 * que busca el archivo correspondiente basado en los parámetros proporcionados.
 *
 * Propiedades:
 *  - FDA01: Función asíncrona que utiliza `FDA.findFileFDA01` para buscar el archivo FDA01.
 *           Requiere `entidadId`, `fileMetdata`, `tipoDocumentoItem.name`, y `tipoEntidadItem.name`
 *           como parámetros para la búsqueda.
 *  - FDA02: Función asíncrona que utiliza `findFileFDA02` para buscar el archivo FDA02.
 *           Similar a FDA01, requiere `entidadId`, `fileMetdata`, `tipoDocumentoItem.name`,
 *           y `tipoEntidadItem.name` como parámetros para la búsqueda.
 *
 * Parámetros:
 *  - entidadId: Identificador de la entidad para la cual se busca el archivo.
 *  - fileMetdata: Metadatos del archivo proporcionados para la búsqueda.
 *  - tipoDocumentoItem.name: Nombre del tipo de documento utilizado en la búsqueda.
 *  - tipoEntidadItem.name: Nombre del tipo de entidad utilizado en la búsqueda.
 *
 * Ejemplo de uso:
 * ```
 * const resultadoFDA01 = await filesFDA.FDA01();
 * const resultadoFDA02 = await filesFDA['FDA02']();
 * ```
 */
const buildPdfFile = async ({
  tipoDocumentoItem, tipoEntidadItem, entidadId, fileMetaData,
}, fileUploaded) => {
  const filesGenerator = {
    FDA01: async () => buildFileFDA01(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDA02: async () => findFileFDA02(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDA03: async () => findFileFDA03(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDA04: async () => findFileFDA04(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDA05: async () => findFileFDA05(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDA06: async () => findFileFDA06(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDP01: async () => findFileFDP01(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDP02: async () => findFileFDP02(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDP05: async () => findFileFDP05(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    FDP06: async () => findFileFDP06(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    OFICIO_ADMISORIO: async () => findFileOFAD(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    ACUERDO_RVOE: async () => findFileRVOE(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    HISTORIAL_ACADEMICO: async () => findFileHistorial(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    REPORTE_BECAS: async () => findFileBeca(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    REPORTE_SERV_SOC: async () => findFileServicio(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
    TITULO_ELECTRONICO_XML: async () => createFileXML(entidadId, fileMetaData, fileUploaded),
    TITULO_ELECTRONICO_PDF: async () => findFileTitulo(
      entidadId,
      fileMetaData,
      { tipoDocumento: tipoDocumentoItem.name, tipoEntidad: tipoEntidadItem.name },
    ),
  };

  if (Object.hasOwn(filesGenerator, tipoDocumentoItem.name)) {
    Logger.info(`[Files:generatePdfFile]: Generando archivo para tipoDocumento: ${tipoDocumentoItem.name}`);
    return filesGenerator[tipoDocumentoItem.name];
  }

  Logger.info(`[Files:generatePdfFile]: No se requiere generación para tipoDocumento: ${tipoEntidadItem.name}`);
  return null;
};

module.exports = { buildPdfFile };
