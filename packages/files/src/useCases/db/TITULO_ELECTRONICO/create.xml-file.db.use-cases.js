/* eslint-disable consistent-return */
const fs = require('fs/promises');
const xml2js = require('xml2js');
const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createFileXML = (
  findOneProgramaQuery,
  findOneTituloElectronicoQuery,
  createTituloElectronicoQuery,
) => async (entidadId, tipoDocumento, fileUploaded) => {
  Logger.info('[createFileXML] Procesando XML');

  if (!fileUploaded) {
    return;
  }

  const parser = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: false,
    tagNameProcessors: [xml2js.processors.stripPrefix],
  });

  let xmlBuffer;
  if (typeof fileUploaded.toBuffer === 'function') {
    xmlBuffer = await fileUploaded.toBuffer();
  } else if (fileUploaded.filepath) {
    xmlBuffer = await fs.readFile(fileUploaded.filepath);
  } else {
    throw new Error('No se pudo obtener el contenido del archivo XML');
  }

  const parsed = await parser.parseStringPromise(xmlBuffer.toString('utf8'));
  const titulo = parsed?.TituloElectronico;

  const curpXML = titulo.Profesionista?.$?.curp;
  const rvoeXML = titulo.Carrera?.$?.numeroRvoe;
  const firma = titulo.FirmaResponsables?.FirmaResponsable?.$;

  const buildPayload = (programa) => ({
    institucionId: programa?.plantel?.institucionId,
    estadoId: titulo.Expedicion?.$?.idEntidadFederativa,
    cargoId: firma?.idCargo,
    autorizacionReconocimientoId: Number(titulo.Carrera?.$?.idAutorizacionReconocimiento),
    modalidadTitulacionId: Number(titulo.Expedicion?.$?.idModalidadTitulacion),
    estadoAntecedenteId: titulo.Antecedente?.$?.idEntidadFederativa,
    fundamentoLegalServicioSocialId: titulo.Expedicion?.$?.idFundamentoLegalServicioSocial,
    tipoEstudioAntecedenteId: titulo.Antecedente?.$?.idTipoEstudioAntecedente,
    version: titulo.$?.version,
    folioControl: titulo.$?.folioControl,
    nombreResponsable: firma?.nombre,
    primerApellidoResponsable: firma?.primerApellido,
    segundoApellidoResponsable: firma?.segundoApellido,
    curpResponsable: firma?.curp,
    sello: firma?.sello,
    certificadoResponsable: firma?.certificadoResponsable,
    noCertificadoResponsable: firma?.noCertificadoResponsable,
    nombreInstitucion: titulo.Institucion?.$?.nombreInstitucion,
    cveInstitucion: titulo.Institucion?.$?.cveInstitucion,
    cveCarrera: titulo.Carrera?.$?.cveCarrera,
    nombreCarrera: titulo.Carrera?.$?.nombreCarrera,
    fechaInicio: titulo.Carrera?.$?.fechaInicio,
    fechaTerminacion: titulo.Carrera?.$?.fechaTerminacion,
    numeroRvoe: rvoeXML,
    curp: curpXML,
    nombre: titulo.Profesionista?.$?.nombre,
    primerApellido: titulo.Profesionista?.$?.primerApellido,
    segundoApellido: titulo.Profesionista?.$?.segundoApellido,
    correoElectronico: titulo.Profesionista?.$?.correoElectronico,
    fechaExpedicion: titulo.Expedicion?.$?.fechaExpedicion,
    fechaExamenProfesional: titulo.Expedicion?.$?.fechaExamenProfesional,
    fechaExencionExamenProfesional: titulo.Expedicion?.$?.fechaExencionExamenProfesional,
    cumplioServicioSocial: titulo.Expedicion?.$?.cumplioServicioSocial,
    institucionProcedencia: titulo.Antecedente?.$?.institucionProcedencia,
    fechaInicioAntecedente: titulo.Antecedente?.$?.fechaInicio,
    fechaTerminacionAntecedente: titulo.Antecedente?.$?.fechaTerminacion,
    noCedula: titulo.Antecedente?.$?.noCedula,
    folioDigital: titulo.Autenticacion?.$?.folioDigital,
    fechaAutenticacion: titulo.Autenticacion?.$?.fechaAutenticacion,
    selloTitulo: titulo.Autenticacion?.$?.selloTitulo,
    noCertificadoAutoridad: titulo.Autenticacion?.$?.noCertificadoAutoridad,
    selloAutenticacion: titulo.Autenticacion?.$?.selloAutenticacion,
  });

  const include = [
    { association: 'plantel', attributes: ['institucionId'] },
  ];
  const programa = await findOneProgramaQuery({ acuerdoRvoe: rvoeXML }, { include });

  if (!programa) {
    Logger.error(`[createFileXML] Programa no encontrado para RVOE: ${rvoeXML}`);
    throw boom.notFound(`Programa no encontrado para RVOE: ${rvoeXML}`);
  }

  const tituloElectronicoFound = await findOneTituloElectronicoQuery({
    folioControl: titulo.$?.folioControl,
    institucionId: programa?.plantel?.institucionId,
  });

  if (tituloElectronicoFound) {
    Logger.info(`[createFileXML] Título electrónico ya existe para folioControl: ${titulo.$?.folioControl}`);
    return {
      tituloElectronico: tituloElectronicoFound.toJSON(),
      entidadId: tituloElectronicoFound.id,
    };
  }

  const tituloElectronico = await createTituloElectronicoQuery(buildPayload(programa.toJSON()));

  return {
    tituloElectronico: tituloElectronico.toJSON(),
    entidadId: tituloElectronico.id,
  };
};

module.exports = { createFileXML };
