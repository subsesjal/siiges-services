const { checkers } = require('@siiges-services/shared');

const updateSolicitudBeca = (
  findOneSolicitudBecaQuery,
  updateAndFindSolicitudBecaQuery,
) => async (data, identifierObj) => {
  const include = [
    { association: 'estatusSolicitudBeca' },
    { association: 'cicloEscolar' },
    { association: 'programa' },
    { association: 'usuario' },
  ];

  const solicitudBeca = await findOneSolicitudBecaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudBeca, 'solicitudes_becas', identifierObj.id);

  return updateAndFindSolicitudBecaQuery(identifierObj, data, { include });
};

module.exports = updateSolicitudBeca;
