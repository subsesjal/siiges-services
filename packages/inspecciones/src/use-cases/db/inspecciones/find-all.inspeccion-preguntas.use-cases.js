const boom = require('@hapi/boom');

const findAllInspeccionPreguntas = (findAllInspeccionPreguntasQuery) => async (identifierObj) => {
  const { query } = identifierObj;
  const where = {};
  const nullQuery = Object.keys(identifierObj.query).length === 0;
  if (!query.apartado !== nullQuery) {
    throw boom.badRequest(`Query parameter [${Object.keys(query)[0]}] not defined`);
  }
  if (query.apartado) {
    where.inspeccionApartadoId = query.apartado;
  }
  const include = [
    { association: 'inspeccionApartado' },
    { association: 'inspeccionCategoria' },
    { association: 'inspeccionTipoPregunta' },
  ];

  const inspeccionPreguntas = await findAllInspeccionPreguntasQuery(where, { undefined, include });

  return inspeccionPreguntas;
};

module.exports = findAllInspeccionPreguntas;
