// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findOneQuery = (model) => async (identifierObj, dbParams) => {
  const { attributes = undefined, include = undefined, strict = true } = dbParams || {};

  const result = model.findOne({
    attributes,
    where: {
      ...identifierObj,
      deletedAt: { [Op.is]: null },
    },
    include: createInclude(include, strict),
  });

  return result;
};
module.exports = findOneQuery;
