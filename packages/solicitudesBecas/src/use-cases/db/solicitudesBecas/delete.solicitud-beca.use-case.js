const { checkers } = require('@siiges-services/shared');

const deleteSolicitudBeca = (
  findOneSolicitudBecaQuery,
  deleteSolicitudBecaQuery,
) => async (identifierObj) => {
  const { id } = identifierObj;

  const solicitudBecaFound = await findOneSolicitudBecaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudBecaFound, 'solicitudesBecas', id);

  return deleteSolicitudBecaQuery(identifierObj);
};

module.exports = deleteSolicitudBeca;
