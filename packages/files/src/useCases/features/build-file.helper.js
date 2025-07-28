const { Logger } = require('@siiges-services/shared');
const {
  buildFileFDA01, findFileFDA02, findFileFDA03, findFileFDA04, findFileFDA05, findFileFDA06,
} = require('../db/FDA');
const {
  findFileFDP01, findFileFDP02, findFileFDP05, findFileFDP06,
} = require('../db/FDP');
const { findFileOFAD } = require('../db/OFAD');
const { findFileRVOE } = require('../db/RVOE');
const { findFileHistorial, findFileBeca, findFileServicio } = require('../db/FSE');
const { createFileXML, findFileTitulo } = require('../db/TITULO_ELECTRONICO');

const buildFile = async (input, fileUploaded) => {
  const { tipoDocumento, entidadId } = input;
  const filesGenerator = {
    FDA01: async () => buildFileFDA01(entidadId),
    FDA02: async () => findFileFDA02(entidadId),
    FDA03: async () => findFileFDA03(entidadId),
    FDA04: async () => findFileFDA04(entidadId),
    FDA05: async () => findFileFDA05(entidadId),
    FDA06: async () => findFileFDA06(entidadId),
    FDP01: async () => findFileFDP01(entidadId),
    FDP02: async () => findFileFDP02(entidadId),
    FDP05: async () => findFileFDP05(entidadId),
    FDP06: async () => findFileFDP06(entidadId),
    OFICIO_ADMISORIO: async () => findFileOFAD(entidadId),
    ACUERDO_RVOE: async () => findFileRVOE(entidadId),
    HISTORIAL_ACADEMICO: async () => findFileHistorial(entidadId),
    REPORTE_BECAS: async () => findFileBeca(entidadId),
    REPORTE_SERV_SOC: async () => findFileServicio(entidadId),
    TITULO_ELECTRONICO_XML: async () => createFileXML(entidadId, fileUploaded),
    TITULO_ELECTRONICO_PDF: async () => findFileTitulo(entidadId),
  };

  if (Object.hasOwn(filesGenerator, tipoDocumento)) {
    Logger.info(`[files]: Generando archivo para tipoDocumento: ${tipoDocumento}`);
    return filesGenerator[tipoDocumento];
  }

  Logger.info(`[files]: No se requiere generación para tipoDocumento: ${tipoDocumento}`);
  return null;
};

module.exports = { buildFile };
