const { checkers } = require('@siiges-services/shared');

const updateAcuerdo = (
  findOneAcuerdoQuery,
  updateAcuerdoQuery,
) => async ({ id, data }) => {
  const acuerdo = await findOneAcuerdoQuery({ id });
  checkers.throwErrorIfDataIsFalsy(acuerdo, 'acuerdos', id);

  const acuerdoUpdated = await updateAcuerdoQuery({ id }, data);

  return acuerdoUpdated;
};

module.exports = { updateAcuerdo };
