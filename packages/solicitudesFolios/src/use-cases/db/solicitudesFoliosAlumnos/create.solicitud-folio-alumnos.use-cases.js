const { checkers } = require('@siiges-services/shared');

const createSolicitudFolioAlumno = (
  findOneAlumnoQuery,
  findOneSolicitudFolioQuery,
  createAlumnoFolioQuery,
  findOneSolicitudFolioAlumnoQuery,
) => async (data) => {
  const solicitudFolio = await findOneSolicitudFolioQuery({ id: data.solicitudFolioId });
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes-folios', data.solicitudFolioId);

  const alumno = await findOneAlumnoQuery({ id: data.alumnoId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumno', data.alumnoId);

  const result = await createAlumnoFolioQuery(data);

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
