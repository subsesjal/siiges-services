const fs = require('fs/promises');
const xml2js = require('xml2js');
const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createFileXML = (
  findOneAlumnoTituloElectronicoQuery,
  findOneAlumnoQuery,
  createTituloElectronicoQuery,
  createAlumnoTituloElectronicoQuery,
) => async (alumnoId, fileMetadata, fileUploaded) => {
  Logger.info(`[createFileXML] Procesando XML para alumnoId: ${alumnoId}`);

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

  const xmlString = xmlBuffer.toString('utf8');

  const parsed = await parser.parseStringPromise(xmlString);
  const titulo = parsed?.TituloElectronico;

  const curpXML = titulo.Profesionista?.$?.curp;
  const rvoeXML = titulo.Carrera?.$?.numeroRvoe;
  const firma = titulo.FirmaResponsables?.FirmaResponsable?.$;

  const include = [
    {
      association: 'persona',
      where: { curp: curpXML },
    },
    {
      association: 'programa',
      where: { acuerdoRvoe: rvoeXML },
      include: [{
        association: 'plantel',
        include: [
          { association: 'institucion' },
          {
            association: 'domicilio',
            include: [
              { association: 'estado' },
              { association: 'municipio' },
            ],
          },
        ],
      }],
    },
  ];

  const alumnoTituloElectronico = await findOneAlumnoTituloElectronicoQuery({ alumnoId }, {});

  if (alumnoTituloElectronico) {
    throw boom.conflict('El alumno ya tiene un título electrónico registrado.');
  }

  const alumno = await findOneAlumnoQuery({ id: alumnoId }, {
    include,
    strict: true,
  });

  if (!alumno) {
    throw boom.conflict('El titulo no corresponde a este alumno.');
  }

  const payload = {
    institucionId: alumno.programa?.plantel?.institucionId,
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
  };

  const tituloInsertado = await createTituloElectronicoQuery(payload);

  await createAlumnoTituloElectronicoQuery({
    alumnoId: alumno.id,
    tituloElectronicoId: tituloInsertado.id,
  });

  Logger.info('[createFileXML] Titulo Electronico creado exitosamente');

  // eslint-disable-next-line consistent-return
  return tituloInsertado;
};

module.exports = { createFileXML };
