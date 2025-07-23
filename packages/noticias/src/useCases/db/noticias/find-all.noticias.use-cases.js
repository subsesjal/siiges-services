const findAllNoticias = (
  findAllNoticiaQuery,
) => async () => {
  const noticias = await findAllNoticiaQuery();

  return noticias;
};

module.exports = { findAllNoticias };
