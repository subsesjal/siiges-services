// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findAllQuery = (model) => async (dbParams) => {
  const {
    attributes, include, strict, query,
  } = dbParams || { strict: true };

  const result = await model.findAll({
    attributes,
    where: {
      ...query,
      deletedAt: { [Op.is]: null },
    },
    include: createInclude(include, strict),
  });

  return result;
};

module.exports = findAllQuery;
