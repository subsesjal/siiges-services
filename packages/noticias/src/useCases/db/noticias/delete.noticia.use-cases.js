const deleteNoticia = (
  findNoticiaQuery,
) => async () => {
  const noticias = await findNoticiaQuery();

  return noticias;
};

module.exports = { deleteNoticia };
