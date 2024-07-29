const { checkers } = require('@siiges-services/shared');

const createAlumnoFolio = (
  findOneAlumnoQuery,
  findOneSolicitudFolioQuery,
  createAlumnoFolioQuery,
) => async (idObj, data) => {
  const {
    solicitudFolioId,
    alumnoId,
  } = idObj;

  const solicitudFolio = await findOneSolicitudFolioQuery({ id: solicitudFolioId });
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes-folios', solicitudFolioId);

  const alumno = await findOneAlumnoQuery({ id: alumnoId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumno', alumnoId);

  const result = await createAlumnoFolioQuery({ ...data, ...idObj });
  return result;
};

module.exports = createAlumnoFolio;
