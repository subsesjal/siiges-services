const { Logger } = require('@siiges-services/shared');

const createInspeccionPreguntas = (createInspeccionPreguntasQuery) => async (data) => {
  Logger.info('[inspeccion/preguntas]: Creating inspeccion-preguntas');
  const inspeccionPreguntas = await createInspeccionPreguntasQuery(data);
  return inspeccionPreguntas;
};

module.exports = createInspeccionPreguntas;
