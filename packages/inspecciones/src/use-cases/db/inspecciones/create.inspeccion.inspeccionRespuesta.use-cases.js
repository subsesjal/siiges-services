const { Logger } = require('@siiges-services/shared');

const create = (
  findOnepreguntaQuery,
  createInspeccionQuery,
  createInspeccionRespuestaQuery,
) => async (data) => {
  const { inspeccionPreguntaId } = data;
  const include = [{
    association: 'inspeccion',
    include: [{ association: 'inspeccionId' }],
  }];

  const createInspeccionRespuesta = await createInspeccionRespuestaQuery(data, include);

  const InspeccionRespuestaArray = [];
  await Promise.all(
    data.inspeccionInspeccionPregunta.map(async (InspeccionInspeccionPregunta) => {
      const pregunta = await findOnepreguntaQuery({
        id: InspeccionInspeccionPregunta,
        inspeccionPreguntaId,
      });
      if (pregunta) {
        const InspeccionRespuesta = await createInspeccionRespuestaQuery({
          inspeccionId: InspeccionInspeccionPregunta,
          inspeccionPreguntaId: inspeccionPreguntaId.id,
        });
        InspeccionRespuestaArray.push(InspeccionRespuesta);
      }
    }),
  );

  Logger.info('[respuesta/create]: respuesta created');

  createInspeccionRespuesta.dataValues.inspeccionRespuesta = InspeccionRespuestaArray;

  return createInspeccionRespuesta;
};

module.exports = create;
