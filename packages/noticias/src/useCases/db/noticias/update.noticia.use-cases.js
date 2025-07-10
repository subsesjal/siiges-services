const updateNoticia = (
  updateNoticiaQuery,
) => async (identifierObject, data) => {
  const noticias = await updateNoticiaQuery(identifierObject, data);

  return noticias;
};

module.exports = { updateNoticia };
