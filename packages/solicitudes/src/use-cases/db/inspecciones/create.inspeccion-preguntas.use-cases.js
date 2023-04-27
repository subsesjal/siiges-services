const { Logger } = require('@siiges-services/shared');

const createInspeccionPreguntas = (createInspeccionPreguntasQuery) => async (data) => {
  Logger.info('[inspeccion/preguntas]: Creating inspeccion-preguntas');
  const inspeccion = await createInspeccionPreguntasQuery(data);
  return inspeccion;
};

module.exports = createInspeccionPreguntas;
