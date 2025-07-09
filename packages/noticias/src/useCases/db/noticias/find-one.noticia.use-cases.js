const findOneNoticia = (
  findNoticiaQuery,
) => async () => {
  const noticias = await findNoticiaQuery();

  return noticias;
};

module.exports = { findOneNoticia };
