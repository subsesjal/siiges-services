const findAllInspeccionPreguntas = (findAllInspeccionPreguntasQuery) => async (identifierObj) => {
  const inspeccionPreguntas = await findAllInspeccionPreguntasQuery(identifierObj);

  return inspeccionPreguntas;
};

module.exports = findAllInspeccionPreguntas;
