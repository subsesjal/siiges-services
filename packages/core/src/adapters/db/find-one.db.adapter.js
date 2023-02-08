// Internal dependencies
const { createInclude, getWhere } = require('../utils');

const findOneQuery = (model) => async (identifierObj, dbParams = {}) => {
  const {
    attributes = undefined,
    include = undefined,
    strict = true,
    isDeleting = false,
    query = undefined,
  } = dbParams;

  return model.findOne({
    attributes,
    where: getWhere(identifierObj, isDeleting, query),
    include: createInclude(include, strict),
  });
};

module.exports = findOneQuery;
