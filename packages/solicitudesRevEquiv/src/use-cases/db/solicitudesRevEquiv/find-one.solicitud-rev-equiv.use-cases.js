const { checkers } = require('@siiges-services/shared');

const findOneSolicitudRevEquiv = (findOneSolicitudRevEquivQuery) => async (identifierObj) => {
  const include = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        {
          association: 'institucionDestino',
          include: [{
            association: 'programa',
            include: [{
              association: 'plantel',
              include: [{
                association: 'institucion',
              }],
            }],
          }],
        },
        { association: 'asignaturasAntecedentes' },
        { association: 'asignaturasEquivalentes' },
      ],
    },
  ];
  const solicitudRevEquiv = await findOneSolicitudRevEquivQuery(
    identifierObj,
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(solicitudRevEquiv, 'solicitudes-rev-equiv', identifierObj.id);

  return solicitudRevEquiv;
};

module.exports = findOneSolicitudRevEquiv;
