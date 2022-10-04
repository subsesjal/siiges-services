// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findOneQuery = (model) => async (
  identifierObj,
  { attributes = undefined, include = undefined, strict = true },
) => model.findOne({
  attributes,
  where: {
    ...identifierObj,
    deletedAt: { [Op.is]: null },
  },
  include: createInclude(include, strict),
});

module.exports = findOneQuery;
