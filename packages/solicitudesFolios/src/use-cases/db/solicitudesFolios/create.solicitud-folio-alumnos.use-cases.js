const createAlumnoFolio = (createAlumnoFolioQuery) => async (data) => {
  const {
    solicitudFolioId,
    alumnoId,
    fechaTermino,
    fechaElaboracion,
  } = data;

  if (!solicitudFolioId) {
    throw new Error(`Solicitud folio no encontrado con id: ${solicitudFolioId}`);
  }

  if (!alumnoId) {
    throw new Error(`Alumno no encontrado con id: ${alumnoId}`);
  }

  if (!fechaTermino) {
    throw new Error(`Fecha de terminación no encontrado con id: ${fechaTermino}`);
  }

  if (!fechaElaboracion) {
    throw new Error(`Fecha de elaboración no encontrado con id: ${fechaElaboracion}`);
  }

  const result = await createAlumnoFolioQuery(data);
  return result;
};

module.exports = createAlumnoFolio;
