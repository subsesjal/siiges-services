const deleteNoticia = (
  deleteNoticiaQuery,
) => async (data) => {
  const noticias = await deleteNoticiaQuery(data);

  return noticias;
};

module.exports = { deleteNoticia };
