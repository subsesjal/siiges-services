const { checkers } = require('@siiges-services/shared');

const findOneEquivalencia = (
  findOneEquivalenciaQuery,
  findOneInteresadoQuery,
  findOnePersonaEquivalenteQuery,
  findOneInstitucionProcedenciaQuery,
  findOneInstitucionDestinoQuery,
  findAllAntecedenteQuery,
  findAllEquivalenteQuery,
  findOneDomicilioEquivalenteQuery,
) => async (identifierObj) => {
  const equivalencia = await findOneEquivalenciaQuery(identifierObj, {
    undefined,
    strict: false,
  });
  const { interesadoId } = equivalencia.dataValues;
  const interesado = await findOneInteresadoQuery(interesadoId);
  const persona = await findOnePersonaEquivalenteQuery(interesado.dataValues.personaId);
  const { domicilioId } = persona.dataValues;
  const { institucionProcedenciaId } = interesado.dataValues;
  const { institucionDestinoId } = interesado.dataValues;
  const institucionProcedencia = await findOneInstitucionProcedenciaQuery(institucionProcedenciaId);
  const institucionDestino = await findOneInstitucionDestinoQuery(institucionDestinoId);
  const asignaturaAntecedente = await findAllAntecedenteQuery({ interesadoId });
  const asignaturaEquivalente = await findAllEquivalenteQuery({ interesadoId });
  const domicilio = await findOneDomicilioEquivalenteQuery({ id: domicilioId });
  const jsonOutput = {
    SolicitudEquivalencia: equivalencia.dataValues,
    interesado: interesado.dataValues,
    persona: persona.dataValues,
    domicilio: domicilio.dataValues,
    institucionProcedencia: institucionProcedencia.dataValues,
    institucionDestino: institucionDestino.dataValues,
    asignaturasAntecedentes: asignaturaAntecedente.map((asignatura) => asignatura.dataValues),
    asignaturasEquivalentes: asignaturaEquivalente.map((asignatura) => asignatura.dataValues),
  };
  checkers.throwErrorIfDataIsFalsy(jsonOutput, 'solicitudes', identifierObj.equivalenciaId);

  return jsonOutput;
};

module.exports = findOneEquivalencia;
