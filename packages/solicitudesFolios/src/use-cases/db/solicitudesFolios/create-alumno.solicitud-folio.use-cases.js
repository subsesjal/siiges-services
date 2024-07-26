const createAlumnoFolio = (createAlumnoFolioQuery) => async (data) => {
  try {
    const result = await createAlumnoFolioQuery(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = createAlumnoFolio;
