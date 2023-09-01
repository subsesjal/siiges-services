const boom = require('@hapi/boom');

const findAllMunicipios = (findAllMunicipiosQuery) => async (params) => {
  const { query } = params;
  const where = {};
  const order = {};
  const nullQuery = Object.keys(query).length === 0;
  if (!query.estadoId !== nullQuery) {
    throw boom.badRequest(`Query parameter [${Object.keys(query)[0]}] not defined`);
  }
  if (query.estadoId) {
    where.estadoId = query.estadoId;
    order.order = ['nombre'];
  }
  const findAllMunicipiosData = await findAllMunicipiosQuery(where, order);
  return findAllMunicipiosData;
};

module.exports = findAllMunicipios;
