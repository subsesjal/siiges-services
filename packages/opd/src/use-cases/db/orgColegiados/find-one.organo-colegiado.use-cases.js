const { checkers } = require('@siiges-services/shared');

const findOneOrgColegiado = (findOneOrgColegiadoQuery) => async ({ id }) => {
  const include = [
    { association: 'sesion' },
    { association: 'periodo' },
  ];

  const orgColegiado = await findOneOrgColegiadoQuery({ id }, { include });
  checkers.throwErrorIfDataIsFalsy(orgColegiado, 'organos_colegiados', id);

  return orgColegiado;
};

module.exports = { findOneOrgColegiado };
