const { checkers } = require('@siiges-services/shared');

const createAcuerdo = (
  findOneOrgColegiadoQuery,
  createAcuerdoQuery,
) => async (identifierObject, data) => {
  const orgColegiado = await findOneOrgColegiadoQuery(identifierObject);
  checkers.throwErrorIfDataIsFalsy(orgColegiado, 'organos_colegiados', identifierObject);

  const acuerdo = await createAcuerdoQuery(data);

  return acuerdo;
};

module.exports = { createAcuerdo };
