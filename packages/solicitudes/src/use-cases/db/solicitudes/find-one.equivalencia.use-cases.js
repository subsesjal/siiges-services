const { checkers } = require('@siiges-services/shared');

const findOneEquivalencia = (findOneEquivalenciaQuery) => async (identifierObj) => {
  const equivalencia = await findOneEquivalenciaQuery(identifierObj, {
    include: [
      {
        association: 'interesado',
        include: [
          { association: 'persona', include: [{ association: 'domicilio' }] },
          { association: 'institucionProcedencia' },
          { association: 'institucionDestino' },
          { association: 'asignaturasAntecedentes' },
          { association: 'asignaturasEquivalentes' },
        ],
      },
    ],
  });
  const { asignaturasAntecedentes, asignaturasEquivalentes } = equivalencia.interesado;
  const jsonOutput = {
    SolicitudEquivalencia: equivalencia.dataValues,
    interesado: equivalencia.interesado.dataValues,
    persona: equivalencia.interesado.persona.dataValues,
    domicilio: equivalencia.interesado.persona.domicilio.dataValues,
    institucionProcedencia: equivalencia.interesado.institucionProcedencia.dataValues,
    institucionDestino: equivalencia.interesado.institucionDestino.dataValues,
    asignaturasAntecedentes: asignaturasAntecedentes.map(({ dataValues }) => dataValues),
    asignaturasEquivalentes: asignaturasEquivalentes.map(({ dataValues }) => dataValues),
  };

  checkers.throwErrorIfDataIsFalsy(jsonOutput, 'solicitudes', identifierObj.equivalenciaId);

  return jsonOutput;
};

module.exports = findOneEquivalencia;
