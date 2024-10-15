const boom = require('@hapi/boom');

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
  { association: 'estatusSolicitudFolio' },
  { association: 'tipoDocumento' },
  { association: 'tipoSolicitudFolio' },
];

const transformDataToTitulo = ({ folioAlumno, programa }) => ({
  ies: programa.plantel.institucion.nombre,
  nombre: folioAlumno.folioDocumentoAlumno.alumno.persona.nombre,
  paterno: folioAlumno.folioDocumentoAlumno.alumno.persona.apellidoPaterno,
  materno: folioAlumno.folioDocumentoAlumno.alumno.persona.apellidoMaterno,
  curp: folioAlumno.folioDocumentoAlumno.alumno.persona.curp,
  email: folioAlumno.folioDocumentoAlumno.alumno.persona.correoPrimario,
  folio: folioAlumno.folioDocumentoAlumno.folioDocumento,
  fecha: folioAlumno.fechaElaboracion,
  inicio: folioAlumno.fechaInicio,
  termino: folioAlumno.fechaTerminacion,
  rvoe: programa.acuerdoRvoe,
  modalidad: folioAlumno.modalidadTitulacionId,
  servicio: folioAlumno.fundamentoServicioSocialId,
  fecha_soc: folioAlumno.fechaElaboracion,
  estado: 14,
  nivel_estudio: programa.nivel.nivelDgp,
  institucion: programa.plantel.institucion.nombre,
  inicio_study: folioAlumno.folioDocumentoAlumno.alumno.validacion.fechaInicioAntecedente,
  termino_study: folioAlumno.folioDocumentoAlumno.alumno.validacion.fechaFinAntecedente,
});

const validateDataTransformed = (data) => Object.values(data).every((value) => value !== null && value !== undefined && value !== '');

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

  const { programa } = solicitudJson;

  // Map over solicitudFoliosAlumnos and use Promises
  // eslint-disable-next-line no-unused-vars
  const titulosEnviados = await Promise.all(
    solicitudJson.solicitudFoliosAlumnos.map(async (folioAlumno) => {
      // Skip if already sent or missing validation data
      if (folioAlumno.folioDocumentoAlumno.envioExitoso
        || !folioAlumno.folioDocumentoAlumno.alumno.validacion) {
        return folioAlumno;
      }

      const dataTransformed = transformDataToTitulo({ folioAlumno, programa });
      const isValid = validateDataTransformed(dataTransformed);

      if (isValid) {
        const response = await service.create(dataTransformed);

        if (response.ok) {
          await updateFolioDocumentoAlumnoQuery(
            { id: folioAlumno.folioDocumentoAlumno.id },
            { envioExitoso: true },
          );
        }
      }

      return dataTransformed;
    }),
  );

  return solicitudFolio;
};

module.exports = envioTitulacion;
