function generateUniqueId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `solEquiv${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
}
const createEquivalencia = (
  createEquivalenciaQuery,
  createAsignaturaAntecedenteQuery,
  createAsignaturaEquivalenteQuery,
  createInstitucionDestinoQuery,
  createInstitucionProcedenciaQuery,
  createDomicilioEquivalenteQuery,
  createPersonaEquivalenteQuery,
  createInteresadoQuery,
) => async ({ data }) => {
  const newDomicilio = await createDomicilioEquivalenteQuery(data.interesado.persona.domicilio);
  const domicilioId = newDomicilio.dataValues.id;

  const newPersona = await createPersonaEquivalenteQuery({
    domicilio_Id: domicilioId,
    nombre: data.interesado.persona.nombre,
    apellidoPaterno: data.interesado.persona.apellidoPaterno,
    apellidoMaterno: data.interesado.persona.apellidoMaterno,
    telefono: data.interesado.persona.telefono,
    curp: data.interesado.persona.curp,
    correoPrincipal: data.interesado.persona.correoPrincipal,
  });
  const newInstitDestino = await createInstitucionDestinoQuery(data.interesado.institucionDestino);
  const newInstitProcedencia = await createInstitucionProcedenciaQuery(
    data.interesado.institucionProcedencia,
  );
  const personaId = newPersona.dataValues.id;
  const procedenciaId = newInstitProcedencia.dataValues.id;
  const destinoId = newInstitDestino.dataValues.id;
  const newInteresado = await createInteresadoQuery({
    personaId,
    institucionProcedenciaId: procedenciaId,
    institucionDestinoId: destinoId,
  });
  const interesadoId = newInteresado.dataValues.id;
  const antecedentesProm = data.asignaturaAntecedente.reduce((promises, asignaturaAntecedente) => {
    const promise = createAsignaturaAntecedenteQuery({
      interesadoId,
      nombre: asignaturaAntecedente.nombre,
      calificacion: asignaturaAntecedente.calificacion,
    });
    return [...promises, promise];
  }, []);
  const equivalentesProm = data.asignaturaEquivalente.reduce((promises, asignaturaEquivalente) => {
    const promise = createAsignaturaEquivalenteQuery({
      interesadoId,
      asignaturaId: asignaturaEquivalente.asignaturaId,
      nombre: asignaturaEquivalente.nombre,
      calificacion: asignaturaEquivalente.calificacion,
    });
    return [...promises, promise];
  }, []);
  await Promise.all([...antecedentesProm, ...equivalentesProm]);

  const newEquivalencia = await createEquivalenciaQuery({
    interesadoId,
    tipoTramiteId: data.tipoTramiteId,
    estatusSolicitudRevEquivId: data.estatusSolicitudRevEquivId,
    fecha: data.fecha,
    folioSolicitud: generateUniqueId(),
  });
  const finalData = {
    id: newEquivalencia.dataValues.id,
    createdAt: newEquivalencia.dataValues.createdAt,
    updatedAt: newEquivalencia.dataValues.updatedAt,
    deletedAt: newEquivalencia.dataValues.deletedAt,
    ...data,
  };
  return finalData;
};
module.exports = createEquivalencia;
