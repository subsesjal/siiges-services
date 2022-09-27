// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findOneQuery = (model) => async (identifierObj, { attributes, include }) => model.findOne({
  attributes,
  where: {
    ...identifierObj,
    deletedAt: { [Op.is]: null },
  },
  include: createInclude(include),
});

module.exports = findOneQuery;
