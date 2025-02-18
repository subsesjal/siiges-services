const { checkers } = require('@siiges-services/shared');

const findOneSolicitudBeca = (
  findOneSolicitudBecaQuery,
) => async (identifierObj) => {
  const filteredQuery = { id: identifierObj.id };

  const include = [
    {
      association: 'estatusSolicitudBeca',
    },
    {
      association: 'cicloEscolar',
    },
    {
      association: 'programa',
    },
  ];

  const beca = await findOneSolicitudBecaQuery(filteredQuery, {
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(beca, 'solicitudesBecas', identifierObj.id);

  return beca;
};

module.exports = findOneSolicitudBeca;
