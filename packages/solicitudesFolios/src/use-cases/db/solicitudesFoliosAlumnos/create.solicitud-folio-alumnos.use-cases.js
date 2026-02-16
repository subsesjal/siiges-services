const { checkers, Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const hasInvalidSituacionValidacion = (validacion) => {
  const invalidSituations = [2, 4];
  return !validacion || invalidSituations.includes(validacion.situacionValidacionId);
};

const createSolicitudFolioAlumno = (
  findOneAlumnoQuery,
  findOneSolicitudFolioQuery,
  createAlumnoFolioQuery,
  findOneSolicitudFolioAlumnoQuery,
  countSolicitudFolioAlumnosQuery,
) => async (data) => {
  const solicitudFolio = await findOneSolicitudFolioQuery({ id: data.solicitudFolioId });
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes-folios', data.solicitudFolioId);
  const fechaExpedicion = new Date(solicitudFolio.createdAt);
  fechaExpedicion.setHours(0, 0, 0, 0);

  const dia = fechaExpedicion.getDay();
  if (dia === 6) fechaExpedicion.setDate(fechaExpedicion.getDate() + 2);
  if (dia === 0) fechaExpedicion.setDate(fechaExpedicion.getDate() + 1);

  const fechaRegistro = new Date(fechaExpedicion);
  fechaRegistro.setDate(fechaExpedicion.getDate() + 5);

  const alumnoInclude = [
    { association: 'persona' },
    { association: 'validacion' },
  ];

  const alumno = await findOneAlumnoQuery(
    { id: data.alumnoId },
    {
      include: alumnoInclude,
      strict: false,
    },
  );
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumno', data.alumnoId);

  if (hasInvalidSituacionValidacion(alumno.validacion)) {
    Logger.error('[titulacion] Alumno validation status is not valid');
    throw boom.conflict('Alumno validation status is not valid');
  }

  const totalAlumnos = await countSolicitudFolioAlumnosQuery({
    solicitudFolioId: data.solicitudFolioId,
  }, { isDeleting: false });

  const consecutivo = totalAlumnos + 1;

  const result = await createAlumnoFolioQuery({
    ...data,
    consecutivo,
    fechaRegistro,
    fechaExpedicion,
  });
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
  ];

  const solicitudFolioAlumno = await findOneSolicitudFolioAlumnoQuery(
    { id: result.id },
    { include },
  );

  return solicitudFolioAlumno;
};

module.exports = createSolicitudFolioAlumno;
