const createNoticia = (
  createNoticiaQuery,
) => async (data) => {
  console.log(data);
  const noticias = await createNoticiaQuery(data);

  return noticias;
};

module.exports = { createNoticia };
