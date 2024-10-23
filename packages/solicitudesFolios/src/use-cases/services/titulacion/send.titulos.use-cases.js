const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

const include = [
  {
    association: 'solicitudFoliosAlumnos',
    include: [
      {
        association: 'folioDocumentoAlumno',
        include: [
          {
            association: 'alumno',
            include: [
              { association: 'persona' },
              { association: 'validacion' },
            ],
          },
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
  { association: 'institucionDgp' },
  { association: 'estatusSolicitudFolio' },
  { association: 'tipoDocumento' },
  { association: 'tipoSolicitudFolio' },
];

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 10);
};

const transformDataToTitulo = ({ folioAlumno, programa, institucionDgp }) => ({
  ies: programa.plantel.institucion.nombre,
  nombre: folioAlumno.folioDocumentoAlumno.alumno.persona.nombre,
  paterno: folioAlumno.folioDocumentoAlumno.alumno.persona.apellidoPaterno,
  materno: folioAlumno.folioDocumentoAlumno.alumno.persona.apellidoMaterno,
  curp: folioAlumno.folioDocumentoAlumno.alumno.persona.curp,
  email: folioAlumno.folioDocumentoAlumno.alumno.persona.correoPrimario,
  folio: folioAlumno.folioDocumentoAlumno.folioDocumento,
  fecha: formatDate(folioAlumno.fechaElaboracion),
  inicio: formatDate(folioAlumno.fechaInicio),
  termino: formatDate(folioAlumno.fechaTerminacion),
  rvoe: programa.acuerdoRvoe,
  modalidad: folioAlumno.modalidadTitulacionId,
  servicio: folioAlumno.fundamentoServicioSocialId,
  fecha_soc: formatDate(folioAlumno.fechaElaboracion),
  estado: 14,
  nivel_estudio: parseInt(programa.nivel.nivelDgp, 10),
  institucion: institucionDgp.nombreInstitucionDgp,
  inicio_study: formatDate(
    folioAlumno.folioDocumentoAlumno.alumno.validacion.fechaInicioAntecedente,
  ),
  termino_study: formatDate(folioAlumno.folioDocumentoAlumno.alumno.validacion.fechaFinAntecedente),
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
  const { envioExitoso, alumno } = folioAlumno.folioDocumentoAlumno;

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

  const { programa, institucionDgp } = solicitudJson;
  console.log(programa);

  // eslint-disable-next-line no-unused-vars
  const titulosEnviados = await Promise.all(
    solicitudJson.solicitudFoliosAlumnos.map(async (folioAlumno) => {
      if (!shouldProcessFolioAlumno(folioAlumno)) {
        return folioAlumno;
      }
      const dataTransformed = transformDataToTitulo({ folioAlumno, programa, institucionDgp });
      console.log(dataTransformed);

      const isValid = validateDataTransformed(dataTransformed);

      if (isValid) {
        try {
          const response = await service.create([dataTransformed]);

          if (response.ok) {
            await updateFolioDocumentoAlumnoQuery(
              { id: folioAlumno.folioDocumentoAlumno.id },
              { envioExitoso: true },
            );
          }
        } catch (error) {
          Logger.error(`Error processing folioAlumno ID: ${folioAlumno.folioDocumentoAlumno.id}`);
        }
      }

      return dataTransformed;
    }),
  );

  return solicitudFolio;
};

module.exports = envioTitulacion;
