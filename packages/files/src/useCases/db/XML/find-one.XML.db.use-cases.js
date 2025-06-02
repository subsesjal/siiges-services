/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const { checkers, Logger } = require('@siiges-services/shared');

function createData({ tipoDocumentoId, tipoEntidadId, entidadId }, nombre, ubicacion) {
  return {
    entidadId,
    nombre,
    tipoDocumentoId,
    tipoEntidadId,
    ubicacion,
  };
}

function getUbication({ tipoEntidad, tipoDocumento }, fileName) {
  return `/uploads/${tipoEntidad}/${tipoDocumento}/${fileName}`;
}

async function uploadFile(fileMetdata, fileUploaded, alumnoId) {
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(fileMetdata);
  const rutaArchivo = `TITULO_ELECTRONICO_XML_alumnoId_${alumnoId}.xml`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(fileMetdata, rutaArchivo, ubication);
  const ruta = path.join(__dirname, '../../../../../../public', ubication);

  fs.mkdirSync(path.dirname(ruta), { recursive: true });
  const fileBuffer = Buffer.from(fileUploaded);
  fs.writeFileSync(ruta, fileBuffer);
  Logger.info(`[files/fs.create]: ${rutaArchivo} file created`);

  if (previousFile) return updateFile(previousFile.id, data);
  return createFile(data);
}

const findFileXML = (
  findOneAlumnoQuery,
  createTituloElectronicoQuery,
) => async (alumnoId, fileMetdata, xmlBuffer) => {
  console.log('[findFileXML] -> fileMetdata recibido:', fileMetdata);
  console.log('[findFileXML] -> alumnoId recibido:', alumnoId);

  const alumno = await findOneAlumnoQuery({ id: alumnoId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumno', alumnoId);

  await uploadFile(fileMetdata, xmlBuffer, alumnoId);

  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(xmlBuffer.toString());

  console.log('[findFileXML] -> parsed XML:', parsed);

  const titulo = parsed?.TítuloElectronico;
  checkers.throwErrorIfDataIsFalsy(titulo, 'xml', 'TítuloElectronico');

  console.log('[findFileXML] -> TítuloElectronico extraído:', titulo);

  const payload = {
    institucionId: alumno.institucionId,
    estadoId: alumno.estadoNacimientoId,
    cargoId: Number(titulo.CargoId),
    autorizacionReconocimientoId: Number(titulo.AutorizacionReconocimientoId),
    modalidadTitulacionId: Number(titulo.ModalidadTitulacionId),
    estadoAntecedenteId: Number(titulo.EstadoAntecedenteId),
    fundamentoLegalServicioSocialId: Number(titulo.FundamentoLegalServicioSocialId),
    tipoEstudioAntecedenteId: Number(titulo.TipoEstudioAntecedenteId),
    version: titulo.Version,
    folioControl: titulo.FolioControl,
    nombreResponsable: titulo.NombreResponsable,
    primerApellidoResponsable: titulo.PrimerApellidoResponsable,
    segundoApellidoResponsable: titulo.SegundoApellidoResponsable ?? null,
    curpResponsable: titulo.CURPResponsable,
    sello: titulo.Sello,
    certificadoResponsable: titulo.CertificadoResponsable,
    noCertificadoResponsable: titulo.NoCertificadoResponsable,
    nombreInstitucion: titulo.InstitucionEducativa?.Nombre,
    cveInstitucion: titulo.InstitucionEducativa?.ClaveInstitucion,
    cveCarrera: titulo.Carrera?.ClaveCarrera,
    nombreCarrera: titulo.Carrera?.Nombre,
    fechaInicio: titulo.FechaInicio,
    fechaTerminacion: titulo.FechaTerminacion,
    numeroRvoe: titulo.Carrera?.NumeroRVOE,
    curp: titulo.CURP,
    nombre: titulo.NombreAlumno?.Nombre,
    primerApellido: titulo.NombreAlumno?.PrimerApellido,
    segundoApellido: titulo.NombreAlumno?.SegundoApellido ?? null,
    correoElectronico: titulo.CorreoElectronico,
    fechaExpedicion: titulo.FechaExpedicion,
    fechaExamenProfesional: titulo.FechaExamenProfesional ?? null,
    fechaExencionExamenProfesional: titulo.FechaExencionExamenProfesional ?? null,
    cumplioServicioSocial: Number(titulo.CumplioServicioSocial),
    institucionProcedencia: titulo.InstitucionProcedencia,
    fechaInicioAntecedente: titulo.FechaInicioAntecedente,
    fechaTerminacionAntecedente: titulo.FechaTerminacionAntecedente,
    noCedula: titulo.NoCedula ?? null,
    folioDigital: titulo.FolioDigital,
    fechaAutenticacion: titulo.FechaAutenticacion,
    selloTitulo: titulo.SelloTitulo,
    noCertificadoAutoridad: titulo.NoCertificadoAutoridad,
    selloAutenticacion: titulo.SelloAutenticacion,
  };

  console.log('[findFileXML] -> Payload para insert:', payload);

  const tituloGuardado = await createTituloElectronicoQuery(payload);
  Logger.info('[findFileXML]: Título electrónico guardado correctamente');

  return tituloGuardado;
};

module.exports = { findFileXML };
