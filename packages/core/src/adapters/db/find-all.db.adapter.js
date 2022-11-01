// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findAllQuery = (model) => async (dbParams = {}, identifierObj = undefined) => {
  const {
    attributes, include, strict = true, query,
  } = dbParams;

  const result = await model.findAll({
    attributes,
    where: {
      ...query,
      ...identifierObj,
      deletedAt: { [Op.is]: null },
    },
    include: createInclude(include, strict),
  });

  return result;
};

module.exports = findAllQuery;
