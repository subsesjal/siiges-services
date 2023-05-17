const { Logger } = require('@siiges-services/shared');

const createInspeccionInspeccionPreguntas = (
  createInspeccionInspeccionPreguntasQuery,
  createInspeccionQuery,
  findOneInspeccionQuery,
  findOneInspeccionPreguntaQuery,
) => async (data) => {
  Logger.info('[inspeccion/inspeccion/preguntas]: Creating inspeccion-preguntas');

  const newInspeccion = await createInspeccionQuery(data);

  const newInspeccionInspeccionPreguntaArray = [];
  await Promise.all(
    data.inspeccionId.map(async (inspeccionId) => {
      const inspeccion = await findOneInspeccionQuery({
        id: inspeccionId,
      });
      if (inspeccion) {
        data.inspeccionPreguntaId.map(async (inspeccionPregunta) => {
          const pregunta = await findOneInspeccionPreguntaQuery({
            id: inspeccionPregunta,
          });
          if (pregunta) {
            const newInspeccionInspeccionPregunta = await createInspeccionInspeccionPreguntasQuery({
              inspeccionId,
              inspeccionPreguntaId: inspeccionPregunta,
              ...data,
            });
            newInspeccionInspeccionPreguntaArray.push(newInspeccionInspeccionPregunta);
          }
        });
      }
    }),
  );

  newInspeccion.dataValues.inspeccionInspeccionPregunta = newInspeccionInspeccionPreguntaArray;
  return newInspeccion;
};

module.exports = createInspeccionInspeccionPreguntas;
