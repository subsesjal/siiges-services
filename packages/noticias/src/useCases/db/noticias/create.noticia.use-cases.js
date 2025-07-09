const createNoticia = (
  findNoticiaQuery,
) => async () => {
  const noticias = await findNoticiaQuery();

  return noticias;
};

module.exports = { createNoticia };
