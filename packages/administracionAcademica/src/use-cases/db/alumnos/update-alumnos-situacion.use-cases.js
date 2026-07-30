const SITUACION_ACTIVO_ID = 1;
const SITUACION_VALIDACION_AUTENTICO = 1;

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

const updateAlumnosSituacion = (
  findAllAlumnosQuery,
  findAllFilesQuery,
  updateAlumnoQuery,
) => async ({ alumnoIds }) => {
  const alumnosEncontrados = await findAllAlumnosQuery(
    { id: alumnoIds },
    {
      attributes: ['id'],
      include: [
        { association: 'validacion', attributes: ['situacionValidacionId'] },
      ],
    },
  );

  const idsEncontrados = alumnosEncontrados.map((alumno) => alumno.id);
  const idsNoEncontrados = alumnoIds.filter((id) => !idsEncontrados.includes(id));

  const archivos = idsEncontrados.length > 0
    ? await findAllFilesQuery(
      { entidadId: idsEncontrados, tipoDocumentoId: TIPOS_DOCUMENTO_REQUERIDOS },
      { attributes: ['entidadId', 'tipoDocumentoId'] },
    )
    : [];

  const documentosPorAlumno = buildDocumentosPorAlumno(archivos);

  const activables = [];
  const noActivables = [...idsNoEncontrados];

  alumnosEncontrados.forEach((alumno) => {
    const situacionValidacionOk = alumno.validacion?.situacionValidacionId
      === SITUACION_VALIDACION_AUTENTICO;
    const documentosOk = tieneDocumentosCompletos(alumno.id, documentosPorAlumno);

    if (situacionValidacionOk && documentosOk) {
      activables.push(alumno.id);
    } else {
      noActivables.push(alumno.id);
    }
  });

  if (activables.length > 0) {
    await updateAlumnoQuery({ id: activables }, { situacionId: SITUACION_ACTIVO_ID });
  }

  return {
    activados: activables,
    noActivados: noActivables,
    totalActivados: activables.length,
    totalNoActivados: noActivables.length,
  };
};

module.exports = updateAlumnosSituacion;
