const findGroupOrgColegiados = (findAllOrgColegiadosQuery) => async (query) => {
  const include = [
    { association: 'sesion' },
    { association: 'periodo' },
  ];
  const orgColegiados = await findAllOrgColegiadosQuery(null, { query, include });

  return orgColegiados;
};

module.exports = { findGroupOrgColegiados };
