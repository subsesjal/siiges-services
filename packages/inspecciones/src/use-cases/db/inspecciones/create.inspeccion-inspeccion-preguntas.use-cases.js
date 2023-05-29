const { Logger } = require('@siiges-services/shared');

const createInspeccionInspeccionPreguntas = (
  createInspeccionInspeccionPreguntasQuery,
  findOneInspeccionQuery,
  findOneInspeccionInspeccionPreguntaQuery,
  updateAndFindInspeccionInspeccionPreguntaQuery,
) => async (data) => {
  Logger.info('[inspeccion/inspeccion/preguntas]: Creating inspeccion-preguntas');

  const newInspeccionInspeccionPreguntaArray = [];

  const inspeccionId = await findOneInspeccionQuery(data.inspeccionId);

  if (inspeccionId) {
    await Promise.all(
      data.map(async ({ inspeccionPreguntaId, respuesta }) => {
        const newRespuesta = await findOneInspeccionInspeccionPreguntaQuery({
          inspeccionPreguntaId,
          inspeccionId,
        });

        let newInspeccionInspeccionPregunta;

        if (newRespuesta) {
          newInspeccionInspeccionPregunta = await updateAndFindInspeccionInspeccionPreguntaQuery({
            inspeccionId,
            inspeccionPreguntaId,
            respuesta,
            ...data,
          });
        } else {
          newInspeccionInspeccionPregunta = await createInspeccionInspeccionPreguntasQuery({
            inspeccionId,
            inspeccionPreguntaId,
            respuesta,
            ...data,
          });
        }
        newInspeccionInspeccionPreguntaArray.push(newInspeccionInspeccionPregunta);
      }),
    );
  }

  return newInspeccionInspeccionPreguntaArray;
};

module.exports = createInspeccionInspeccionPreguntas;
