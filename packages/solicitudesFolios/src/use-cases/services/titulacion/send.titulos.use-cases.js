const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

const include = [
  {
    association: 'solicitudFoliosAlumnos',
    include: [
      { association: 'folioDocumentoAlumno' },
      {
        association: 'alumno',
        include: [
          { association: 'persona' },
          { association: 'validacion' },
        ],
      },
    ],
  },
  {
    association: 'programa',
    include: [
      {
        association: 'plantel',
        include: [{ association: 'institucion' }],
      },
      { association: 'nivel' },
    ],
  },
  { association: 'estatusSolicitudFolio' },
  { association: 'tipoDocumento' },
  { association: 'tipoSolicitudFolio' },
];

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 10);
};

const transformDataToTitulo = ({ folioAlumno, programa }) => ({
  nombre: folioAlumno.alumno.persona.nombre,
  paterno: folioAlumno.alumno.persona.apellidoPaterno,
  materno: folioAlumno.alumno.persona.apellidoMaterno,
  curp: folioAlumno.alumno.persona.curp,
  email: folioAlumno.alumno.persona.correoPrimario,
  folio: folioAlumno.folioDocumentoAlumno.folioDocumento,
  fecha: formatDate(folioAlumno.fechaExpedicion),
  inicio: formatDate(folioAlumno.fechaInicio),
  termino: formatDate(folioAlumno.fechaTerminacion),
  rvoe: programa.acuerdoRvoe,
  modalidad: folioAlumno.modalidadTitulacionId,
  servicio: folioAlumno.fundamentoServicioSocialId,
  fecha_proto: formatDate(folioAlumno.fechaExamenProfesional),
  estado: 14,
  nivel_estudio: parseInt(programa.nivel.nivelDgp, 10),
  institucion: folioAlumno.alumno.validacion.nombreInstitucionEmisora,
  inicio_study: formatDate(folioAlumno.alumno.validacion.fechaInicioAntecedente),
  termino_study: formatDate(folioAlumno.alumno.validacion.fechaFinAntecedente),
  cedula_procedencia: parseInt(folioAlumno.alumno.validacion.cedulaProfesional, 10),
});

const validateDataTransformed = (data) => Object.entries(data).every(([key, value]) => {
  if (key === 'materno') {
    return true;
  }

  return value !== null && value !== undefined && value !== '';
});

const isEnvioExitoso = (envioExitoso) => envioExitoso;

const hasInvalidSituacionValidacion = (validacion) => {
  const invalidSituations = [2, 4];
  return !validacion || invalidSituations.includes(validacion.situacionValidacionId);
};

const shouldProcessFolioAlumno = (folioAlumno) => {
  const { alumno } = folioAlumno;
  const { envioExitoso } = folioAlumno.folioDocumentoAlumno;

  if (isEnvioExitoso(envioExitoso)) {
    Logger.error('[titulacion] Sending already successful, do not process.');
    return false;
  }

  if (hasInvalidSituacionValidacion(alumno.validacion)) {
    Logger.error('[titulacion] Alumno validation is not valid');
    return false;
  }

  return true;
};

const envioTitulacion = (
  service,
  findOneSolicitudesFoliosQuery,
  updateFolioDocumentoAlumnoQuery,
) => async ({ id }) => {
  const solicitudFolio = await findOneSolicitudesFoliosQuery({ id }, { include, strict: false });
  const solicitudJson = solicitudFolio.toJSON();

  if (solicitudJson.tipoDocumentoId !== 1) {
    throw boom.conflict('This request is only allowed for the TITULO document type.');
  }

  if (solicitudJson.estatusSolicitudFolioId !== 3) {
    throw boom.conflict('This request is only allowed for the estatus FOLIOS ASIGNADOS.');
  }
  const { programa } = solicitudJson;

  // eslint-disable-next-line no-unused-vars
  const titulosEnviados = await Promise.all(
    solicitudJson.solicitudFoliosAlumnos.map(async (folioAlumno) => {
      if (!shouldProcessFolioAlumno(folioAlumno)) {
        return folioAlumno;
      }
      const dataTransformed = transformDataToTitulo({ folioAlumno, programa });
      const isValid = validateDataTransformed(dataTransformed);

      if (isValid) {
        // eslint-disable-next-line no-unused-vars
        const response = await service.create(dataTransformed);

        await updateFolioDocumentoAlumnoQuery(
          { id: folioAlumno.folioDocumentoAlumno.id },
          { envioExitoso: true },
        );
      }
      return dataTransformed;
    }),
  );

  return solicitudFolio;
};

module.exports = envioTitulacion;
