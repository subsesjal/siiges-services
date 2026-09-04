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
    pagination = undefined,
  } = dbParams;
  const options = {
    attributes,
    order,
    where: getWhere(identifierObj, isDeleting, query),
    include: createInclude(include, strict),
  };

  if (!pagination) {
    return model.findAll(options);
  }

  return model.findAndCountAll({
    ...options,
    limit: pagination.limit,
    offset: pagination.offset,
    distinct: pagination.distinct,
  });
};

module.exports = findAllQuery;
