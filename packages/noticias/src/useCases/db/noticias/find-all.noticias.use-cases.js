const findAllNoticias = (
  findNoticiaQuery,
) => async () => {
  const noticias = await findNoticiaQuery();

  return noticias;
};

module.exports = { findAllNoticias };
