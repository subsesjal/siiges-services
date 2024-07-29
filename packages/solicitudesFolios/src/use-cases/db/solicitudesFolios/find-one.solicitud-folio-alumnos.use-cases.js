const findOneSolicitudFolioAlumno = (findOneSolicitudFolioAlumnoQuery) => async (
  { alumnoId, solicitudFolioId },
) => {
  const result = await findOneSolicitudFolioAlumnoQuery(
    {
      solicitud_folio_id: solicitudFolioId,
      alumno_id: alumnoId,
    },
  );
  return result;
};

module.exports = findOneSolicitudFolioAlumno;
