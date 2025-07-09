const updateNoticia = (
  findNoticiaQuery,
) => async () => {
  const noticias = await findNoticiaQuery();

  return noticias;
};

module.exports = { updateNoticia };
