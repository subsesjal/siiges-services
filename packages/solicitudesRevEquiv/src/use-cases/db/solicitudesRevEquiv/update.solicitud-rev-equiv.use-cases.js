const { checkers } = require('@siiges-services/shared');

const updateSolicitudRevEquiv = (
  findOneSolicitudRevEquivQuery,
  updateSolicitudRevEquivQuery,
) => async (data, identifierObj) => {
  const include = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        { association: 'institucionDestino' },
      ],
    },
  ];

  const solicitudRevEquiv = await findOneSolicitudRevEquivQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudRevEquiv, 'solicitudes-rev-equiv', identifierObj.id);

  return updateSolicitudRevEquivQuery(
    identifierObj,
    data,
    { include },
  );
};

module.exports = updateSolicitudRevEquiv;
