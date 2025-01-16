const { checkers } = require('@siiges-services/shared');

const findOneSolicitudRevEquiv = (findOneSolicitudRevEquivQuery) => async (identifierObj) => {
  const include = [{
    association: 'interesado',
    include: [
      { association: 'persona', include: [{ association: 'domicilio' }] },
      { association: 'institucionProcedencia' },
      {
        association: 'institucionDestino',
        include: [{
          association: 'institucionDestinoPrograma',
          include: [{
            association: 'programa',
            include: [{
              association: 'plantel',
              include: [{ association: 'institucion' }],
            }],
          }],
        }],
      },
      {
        association: 'asignaturasAntecedenteEquivalente',
        include: [{
          association: 'asignaturaEquivalentePrograma',
          include: [{ association: 'asignatura' }],
        }],
      },
    ],
  }];

  const solicitudRevEquiv = await findOneSolicitudRevEquivQuery(
    identifierObj,
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(solicitudRevEquiv, 'solicitudes-rev-equiv', identifierObj.id);

  return solicitudRevEquiv;
};

module.exports = findOneSolicitudRevEquiv;
