const { Logger } = require('@siiges-services/shared');

const createInspeccionInspeccionPreguntas = (
  createInspeccionInspeccionPreguntasQuery,
  //findOneInspeccionQuery,
  //findOneInspeccionPreguntaQuery,
) => async (data) => {
  Logger.info('[inspeccion/inspeccion/preguntas]: Creating inspeccion-preguntas');

  /* -----------Quiza funcione cuando existan los Querys necesarios

  const newInspeccionInspeccionPreguntaArray = [];
  await Promise.all(
    data.inspeccionId.map(async (inspeccionId) => {
      const inspeccion = await findOneInspeccionQuery({
        id: inspeccionId,
      });
      if(inspeccion) {
        data.inspeccionPreguntaId.map(async (inspeccionPregunta) => {
          const pregunta = await findOneInspeccionPreguntaQuery({
            id: inspeccionPregunta,
          });
          if(pregunta) {
            const newInspeccionInspeccionPregunta = await createInspeccionInspeccionPreguntasQuery({
              inspeccionId: inspeccionId,
              inspeccionPreguntaId: inspeccionPregunta,
              ...data,
            });
            newInspeccionInspeccionPreguntaArray.push(newInspeccionInspeccionPregunta);
          }
        }),
      }
    }),
  );*/

  //Esto dara error por las llaves foraneas
  const inspeccion = await createInspeccionInspeccionPreguntasQuery(data);
  return inspeccion;
};

module.exports = createInspeccionInspeccionPreguntas;
