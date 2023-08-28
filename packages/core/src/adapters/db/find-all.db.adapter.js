// Internal dependencies
const { createInclude, getWhere } = require('../utils');

const findAllQuery = (model) => async (identifierObj, dbParams = {}) => {
  const {
    attributes = undefined,
    include = undefined,
    strict = true,
    isDeleting = false,
    query = undefined,
    order = undefined,
  } = dbParams;
  return model.findAll({
    attributes,
    order,
    where: getWhere(identifierObj, isDeleting, query),
    include: createInclude(include, strict),
  });
};

module.exports = findAllQuery;
