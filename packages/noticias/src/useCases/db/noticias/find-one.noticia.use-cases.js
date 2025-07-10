const findOneNoticia = (
  findOneNoticiaQuery,
) => async () => {
  const noticias = await findOneNoticiaQuery();

  return noticias;
};

module.exports = { findOneNoticia };
