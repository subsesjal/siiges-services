const { checkers } = require('@siiges-services/shared');

const findOneAcuerdo = (findOneAcuerdoQuery) => async ({ id }) => {
  const acuerdo = await findOneAcuerdoQuery({ id });
  checkers.throwErrorIfDataIsFalsy(acuerdo, 'organos_colegiados', id);

  return acuerdo;
};

module.exports = { findOneAcuerdo };
