const { checkers } = require('@siiges-services/shared');

const TIPO_DOCUMENTO_VALIDACION_ALUMNO = 40;
const TIPO_DOCUMENTO_CERTIFICADO = 41;
const TIPO_DOCUMENTO_NACIMIENTO = 42;
const TIPO_DOCUMENTO_CURP = 43;

const TIPOS_DOCUMENTO_MAP = {
  [TIPO_DOCUMENTO_VALIDACION_ALUMNO]: 'archivoValidacionUbicacion',
  [TIPO_DOCUMENTO_CERTIFICADO]: 'archivoCertificadoUbicacion',
  [TIPO_DOCUMENTO_NACIMIENTO]: 'archivoNacimientoUbicacion',
  [TIPO_DOCUMENTO_CURP]: 'archivoCurpUbicacion',
};

const buildDocumentosPorAlumno = (archivos) => {
  const documentosPorAlumno = new Map();

  archivos.forEach((file) => {
    if (!documentosPorAlumno.has(file.entidadId)) {
      documentosPorAlumno.set(file.entidadId, {});
    }
    const campo = TIPOS_DOCUMENTO_MAP[file.tipoDocumentoId];
    if (campo) {
      documentosPorAlumno.get(file.entidadId)[campo] = file.ubicacion;
    }
  });

  return documentosPorAlumno;
};

const attachDocumentos = (alumnoInstance, documentosPorAlumno) => {
  const alumno = alumnoInstance;
  const documentos = documentosPorAlumno.get(alumno.id) || {};
  alumno.dataValues.archivoValidacionUbicacion = documentos.archivoValidacionUbicacion || null;
  alumno.dataValues.archivoCertificadoUbicacion = documentos.archivoCertificadoUbicacion || null;
  alumno.dataValues.archivoNacimientoUbicacion = documentos.archivoNacimientoUbicacion || null;
  alumno.dataValues.archivoCurpUbicacion = documentos.archivoCurpUbicacion || null;
  return alumno;
};

const findGroupAlumnosPrograma = (
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findAllAlumnosQuery,
  findAllFilesQuery,
) => async (
  identifierObj,
) => {
  const { programaId, matricula } = identifierObj;

  const include = [
    { association: 'persona' },
    { association: 'situacion' },
    { association: 'equivalencia' },
    {
      association: 'validacion',
      include: [
        { association: 'situacionValidacion' },
        { association: 'tipo' },
      ],
    },
    {
      association: 'alumnoGrupos',
      include: [{
        association: 'grupo',
        include: [{
          association: 'grado',
        }],
      }],
    },
  ];

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const tiposDocumento = Object.keys(TIPOS_DOCUMENTO_MAP).map(Number);

  if (matricula) {
    const alumno = await findOneAlumnoQuery(identifierObj, { include, strict: false });
    checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', matricula);

    const archivos = await findAllFilesQuery(
      { entidadId: [alumno.id], tipoDocumentoId: tiposDocumento },
      { attributes: ['entidadId', 'tipoDocumentoId', 'ubicacion'] },
    );
    const documentosPorAlumno = buildDocumentosPorAlumno(archivos);

    return attachDocumentos(alumno, documentosPorAlumno);
  }

  const alumnos = await findAllAlumnosQuery({ programaId }, {
    include,
    strict: false,
  });

  const alumnoIds = alumnos.map((alumno) => alumno.id);
  const archivos = alumnoIds.length > 0
    ? await findAllFilesQuery(
      { entidadId: alumnoIds, tipoDocumentoId: tiposDocumento },
      { attributes: ['entidadId', 'tipoDocumentoId', 'ubicacion'] },
    )
    : [];
  const documentosPorAlumno = buildDocumentosPorAlumno(archivos);

  return alumnos.map((alumno) => attachDocumentos(alumno, documentosPorAlumno));
};

module.exports = findGroupAlumnosPrograma;
