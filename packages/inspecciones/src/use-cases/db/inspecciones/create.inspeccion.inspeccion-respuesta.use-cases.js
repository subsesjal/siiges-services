const { checkers } = require('@siiges-services/shared');

const createInspeccionRespuestas = (
  findOneInspeccionQuery,
  findOneInspeccionInspeccionPreguntaQuery,
  createInspeccionInspeccionPreguntaQuery,
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
        const inspeccionRespuesta = await createInspeccionInspeccionPreguntaQuery({
          inspeccionId,
          inspeccionPreguntaId,
          respuesta,
        });
        inspeccionRespuestaArray.push(inspeccionRespuesta);
      } else {
        // update response

      }
    }),
  );

  return inspeccionRespuestaArray;
};

module.exports = createInspeccionRespuestas;
