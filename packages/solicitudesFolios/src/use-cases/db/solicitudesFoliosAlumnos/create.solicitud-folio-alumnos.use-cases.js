const { checkers } = require('@siiges-services/shared');

const createSolicitudFolioAlumno = (
  findOneAlumnoQuery,
  findOneSolicitudFolioQuery,
  createAlumnoFolioQuery,
) => async (data) => {
  const solicitudFolio = await findOneSolicitudFolioQuery({ id: data.solicitudFolioId });
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes-folios', data.solicitudFolioId);

  const alumno = await findOneAlumnoQuery({ id: data.alumnoId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumno', data.alumnoId);

  const result = await createAlumnoFolioQuery(data);
  return result;
};

module.exports = createSolicitudFolioAlumno;
