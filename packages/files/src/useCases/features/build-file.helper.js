const { Logger } = require('@siiges-services/shared');
const {
  buildFileFDA01,
  buildFileFDA02,
  findFileFDA03,
  findFileFDA04,
  findFileFDA05,
  findFileFDA06,
} = require('../db/FDA');
const {
  findFileFDP01, findFileFDP02, findFileFDP05, findFileFDP06,
} = require('../db/FDP');
const { findFileOFAD } = require('../db/OFAD');
const { findFileRVOE } = require('../db/RVOE');
const { buildFileHistorial, findFileBeca, findFileServicio } = require('../db/FSE');
const { createFileXML, findFileTitulo } = require('../db/TITULO_ELECTRONICO');

const buildFile = async (input, fileUploaded) => {
  const { tipoDocumento, entidadId } = input;
  const filesGenerator = {
    FDA01: async () => buildFileFDA01(entidadId, tipoDocumento),
    FDA02: async () => buildFileFDA02(entidadId, tipoDocumento),
    FDA03: async () => findFileFDA03(entidadId, tipoDocumento),
    FDA04: async () => findFileFDA04(entidadId, tipoDocumento),
    FDA05: async () => findFileFDA05(entidadId, tipoDocumento),
    FDA06: async () => findFileFDA06(entidadId, tipoDocumento),
    FDP01: async () => findFileFDP01(entidadId, tipoDocumento),
    FDP02: async () => findFileFDP02(entidadId, tipoDocumento),
    FDP05: async () => findFileFDP05(entidadId, tipoDocumento),
    FDP06: async () => findFileFDP06(entidadId, tipoDocumento),
    OFICIO_ADMISORIO: async () => findFileOFAD(entidadId, tipoDocumento),
    ACUERDO_RVOE: async () => findFileRVOE(entidadId, tipoDocumento),
    HISTORIAL_ACADEMICO: async () => buildFileHistorial(entidadId, tipoDocumento),
    REPORTE_BECAS: async () => findFileBeca(entidadId, tipoDocumento),
    REPORTE_SERV_SOC: async () => findFileServicio(entidadId, tipoDocumento),
    TITULO_ELECTRONICO_XML: async () => createFileXML(entidadId, tipoDocumento, fileUploaded),
    TITULO_ELECTRONICO_PDF: async () => findFileTitulo(entidadId, tipoDocumento),
  };

  if (Object.hasOwn(filesGenerator, tipoDocumento)) {
    Logger.info(`[files]: Generando archivo para tipoDocumento: ${tipoDocumento}`);
    return filesGenerator[tipoDocumento];
  }

  Logger.info(`[files]: No se requiere generación para tipoDocumento: ${tipoDocumento}`);
  return null;
};

module.exports = { buildFile };
