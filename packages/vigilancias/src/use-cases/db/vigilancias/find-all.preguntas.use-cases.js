const boom = require('@hapi/boom');

const findAllPreguntas = (findAllVigilanciaPreguntasQuery) => async (identifierObj) => {
  const { query } = identifierObj;
  const where = {};
  const nullQuery = Object.keys(identifierObj.query).length === 0;
  if (!query.apartado !== nullQuery) {
    throw boom.badRequest(`Query parameter [${Object.keys(query)[0]}] not defined`);
  }
  if (query.apartado) {
    where.vigilanciaApartadoId = query.apartado;
  }
  const include = [
    { association: 'vigilanciaApartado' },
    { association: 'vigilanciaCategoria' },
    { association: 'vigilanciaTipoPregunta' },
  ];

  const vigilanciaPreguntas = await findAllVigilanciaPreguntasQuery(where, { include });

  return vigilanciaPreguntas;
};

module.exports = { findAllPreguntas };
