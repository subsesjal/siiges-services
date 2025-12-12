const { Logger } = require('@siiges-services/shared');
const {
  buildFileFDA01,
  buildFileFDA02,
  buildFileFDA03,
  buildFileFDA04,
  buildFileFDA06,
} = require('../db/FDA');
const {
  buildFileFDP02,
  buildFileFDP05,
  buildFileFDP06,
} = require('../db/FDP');
const { buildFileOFAD } = require('../db/OFAD');
const { buildFileAcuerdoRvoe } = require('../db/RVOE');
const { buildFileHistorial, findFileBeca, findFileServicio } = require('../db/FSE');
const { createFileXML, findFileTitulo } = require('../db/TITULO_ELECTRONICO');
const { buildFileFOLIOCER } = require('../db/FOLIOS');
const { buildFileCertitulo } = require('../db/CERTIFICADO');

const buildFile = async (input, fileUploaded) => {
  const { tipoDocumento, entidadId } = input;
  const filesGenerator = {
    FDA01: async () => buildFileFDA01(entidadId, tipoDocumento),
    FDA02: async () => buildFileFDA02(entidadId, tipoDocumento),
    FDA03: async () => buildFileFDA03(entidadId, tipoDocumento),
    FDA04: async () => buildFileFDA04(entidadId, tipoDocumento),
    FDA06: async () => buildFileFDA06(entidadId, tipoDocumento),
    FDP02: async () => buildFileFDP02(entidadId, tipoDocumento),
    FDP05: async () => buildFileFDP05(entidadId, tipoDocumento),
    FDP06: async () => buildFileFDP06(entidadId, tipoDocumento),
    OFICIO_ADMISORIO: async () => buildFileOFAD(entidadId, tipoDocumento),
    ACUERDO_RVOE: async () => buildFileAcuerdoRvoe(entidadId, tipoDocumento),
    HISTORIAL_ACADEMICO: async () => buildFileHistorial(entidadId, tipoDocumento),
    REPORTE_BECAS: async () => findFileBeca(entidadId, tipoDocumento),
    REPORTE_SERV_SOC: async () => findFileServicio(entidadId, tipoDocumento),
    TITULO_ELECTRONICO_XML: async () => createFileXML(entidadId, tipoDocumento, fileUploaded),
    TITULO_ELECTRONICO_PDF: async () => findFileTitulo(entidadId, tipoDocumento),
    FORMATO_ASIGNACION_FOLIOS_CER: async () => buildFileFOLIOCER(entidadId, tipoDocumento),
    FORMATO_ASIGNACION_FOLIOS_TIT: async () => buildFileFOLIOCER(entidadId, tipoDocumento),
    CERTIFICADO_ELECTRONICO_PDF: async () => buildFileCertitulo(entidadId, tipoDocumento),
  };

  if (Object.hasOwn(filesGenerator, tipoDocumento)) {
    Logger.info(`[files]: Generando archivo para tipoDocumento: ${tipoDocumento}`);
    return filesGenerator[tipoDocumento];
  }

  Logger.info(`[files]: No se requiere generación para tipoDocumento: ${tipoDocumento}`);
  return null;
};

module.exports = { buildFile };
