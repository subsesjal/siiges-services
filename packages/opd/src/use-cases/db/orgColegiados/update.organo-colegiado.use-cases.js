const { checkers } = require('@siiges-services/shared');

const updateOrgColegiado = (
  findOneOrgColegiadoQuery,
  updateOrgColegiadoQuery,
) => async ({ id, data }) => {
  const organoColegiado = await findOneOrgColegiadoQuery({ id });
  checkers.throwErrorIfDataIsFalsy(organoColegiado, 'organos_colegiados', id);

  const orgColegiadoUpdate = await updateOrgColegiadoQuery({ id }, data);

  return orgColegiadoUpdate;
};

module.exports = { updateOrgColegiado };
