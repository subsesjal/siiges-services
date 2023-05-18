const { checkers } = require('@siiges-services/shared');

const createInspeccionRespuestas = (
  findOneInspeccionQuery,
  findOneInspeccionInspeccionPreguntaQuery,
  createInspeccionInspeccionPreguntaQuery,
  updateInspeccionInspeccionPreguntaQuery,
) => async (identifierObj, data) => {
  const { inspeccionId } = identifierObj;

  const inspeccion = await findOneInspeccionQuery({ id: inspeccionId });
  checkers.throwErrorIfDataIsFalsy(inspeccion, 'inspecciones', identifierObj.inspeccionId);

  const inspeccionRespuestaArray = [];
  await Promise.all(
    data.map(async ({ inspeccionPreguntaId, respuesta }) => {
      // find respuesta
      const pregunta = await findOneInspeccionInspeccionPreguntaQuery({
        inspeccionId,
        inspeccionPreguntaId,
      });

      // if the response wasn't find, save the response
      if (!pregunta) {
        // create response
        const inspeccionInspeccionPreguntaCreated = await createInspeccionInspeccionPreguntaQuery({
          inspeccionId,
          inspeccionPreguntaId,
          respuesta,
        });

        inspeccionRespuestaArray.push(inspeccionInspeccionPreguntaCreated);
      } else {
        // update response
        const inspeccionInspeccionPreguntaUpdated = await updateInspeccionInspeccionPreguntaQuery({
          inspeccionId,
          inspeccionPreguntaId,
        }, { respuesta });

        inspeccionRespuestaArray.push(inspeccionInspeccionPreguntaUpdated);
      }
    }),
  );

  return inspeccionRespuestaArray;
};

module.exports = createInspeccionRespuestas;
