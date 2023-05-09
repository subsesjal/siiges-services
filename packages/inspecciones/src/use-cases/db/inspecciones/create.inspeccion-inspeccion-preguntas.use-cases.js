const { Logger } = require('@siiges-services/shared');

const createInspeccionInspeccionPreguntas = (
  createInspeccionInspeccionPreguntasQuery,
) => async (data) => {
  Logger.info('[inspeccion/preguntas]: Creating inspeccion-preguntas');
  const inspeccion = await createInspeccionInspeccionPreguntasQuery(data);
  return inspeccion;
};

module.exports = createInspeccionInspeccionPreguntas;
