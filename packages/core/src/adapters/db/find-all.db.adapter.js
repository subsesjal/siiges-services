// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findAllQuery = (model) => async (dbParams) => {
  const { attributes, include, strict } = dbParams || { strict: true };

  const result = await model.findAll({
    attributes,
    where: {
      deletedAt: { [Op.is]: null },
    },
    include: createInclude(include, strict),
  });

  return result;
};

module.exports = findAllQuery;
