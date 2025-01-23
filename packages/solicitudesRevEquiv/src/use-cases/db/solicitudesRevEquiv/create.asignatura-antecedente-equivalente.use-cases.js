const createAsignaturaAntecedenteEquivalente = (
  createAsignaturaAntecedenteEquivalenteQuery,
  createAsignaturaEquivalenteProgramaQuery,
  findOneAsignaturaQuery,
) => async (data) => {
  const asignaturaAntEquiv = await createAsignaturaAntecedenteEquivalenteQuery(data);

  if (!data.asignaturaId) return asignaturaAntEquiv;

  const respuesta2 = await createAsignaturaEquivalenteProgramaQuery({
    asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
    asignaturaId: data.asignaturaId,
  });
  const asignatura = await findOneAsignaturaQuery(
    { id: data.asignaturaId },
  );

  return {
    interesadoId: asignaturaAntEquiv.interesadoId,
    nombreAsignaturaEquivalente: asignaturaAntEquiv.nombreAsignaturaEquivalente,
    calificacionEquivalente: asignaturaAntEquiv.calificacionEquivalente,
    nombreAsignaturaAntecedente: asignaturaAntEquiv.nombreAsignaturaAntecedente,
    calificacionAntecedente: asignaturaAntEquiv.calificacionAntecedente,
    createdAt: asignaturaAntEquiv.createdAt,
    updatedAt: asignaturaAntEquiv.updatedAt || '',
    deletedAt: asignaturaAntEquiv.deletedAt || '',
    asignaturaEquivalentePrograma: {
      asignaturaAntecedenteEquivalenteId: respuesta2.asignaturaAntecedenteEquivalenteId,
      asignaturaId: respuesta2.asignaturaId,
      createdAt: respuesta2.createdAt,
      updatedAt: respuesta2.updatedAt || '',
      deletedAt: respuesta2.deletedAt || '',
      asignatura: {
        programaId: asignatura.programaId,
        gradoId: asignatura.gradoId,
        areaId: asignatura.areaId,
        academia: asignatura.academia || '',
        consecutivo: asignatura.consecutivo,
        nombre: asignatura.nombre,
        clave: asignatura.clave,
        seriacion: asignatura.seriacion || '',
        objetivo: asignatura.objetivo || '',
        temas: asignatura.temas || '',
        actividades: asignatura.actividades || '',
        modeloInstruccional: asignatura.modeloInstruccional || '',
        horasDocente: asignatura.horasDocente || 0,
        horasIndependiente: asignatura.horasIndependiente || 0,
        creditos: asignatura.creditos || 0,
        tipo: asignatura.tipo,
        fechaAutorizacion: asignatura.fechaAutorizacion,
        createdAt: asignatura.createdAt,
        updatedAt: asignatura.updatedAt || '',
        deletedAt: asignatura.deletedAt || '',
      },
    },
  };
};

module.exports = createAsignaturaAntecedenteEquivalente;
