const TIPO_DOCUMENTO_VALIDACION_ALUMNO = 40;
const TIPO_DOCUMENTO_CERTIFICADO = 41;
const TIPO_DOCUMENTO_NACIMIENTO = 42;
const TIPO_DOCUMENTO_CURP = 43;

const TIPOS_DOCUMENTO_REQUERIDOS = [
  TIPO_DOCUMENTO_VALIDACION_ALUMNO,
  TIPO_DOCUMENTO_CERTIFICADO,
  TIPO_DOCUMENTO_NACIMIENTO,
  TIPO_DOCUMENTO_CURP,
];

const buildDocumentosPorAlumno = (archivos) => {
  const documentosPorAlumno = new Map();

  archivos.forEach((file) => {
    if (!documentosPorAlumno.has(file.entidadId)) {
      documentosPorAlumno.set(file.entidadId, new Set());
    }
    documentosPorAlumno.get(file.entidadId).add(file.tipoDocumentoId);
  });

  return documentosPorAlumno;
};

const tieneDocumentosCompletos = (alumnoId, documentosPorAlumno) => {
  const tiposEncontrados = documentosPorAlumno.get(alumnoId);
  if (!tiposEncontrados) return false;

  return TIPOS_DOCUMENTO_REQUERIDOS.every((tipoId) => tiposEncontrados.has(tipoId));
};

const checkDocumentosAlumno = async (alumnoId, findAllFilesQuery) => {
  const archivos = await findAllFilesQuery(
    { entidadId: [alumnoId], tipoDocumentoId: TIPOS_DOCUMENTO_REQUERIDOS },
    { attributes: ['entidadId', 'tipoDocumentoId'] },
  );
  const documentosPorAlumno = buildDocumentosPorAlumno(archivos);
  return tieneDocumentosCompletos(alumnoId, documentosPorAlumno);
};

module.exports = {
  TIPOS_DOCUMENTO_REQUERIDOS,
  buildDocumentosPorAlumno,
  tieneDocumentosCompletos,
  checkDocumentosAlumno,
};
