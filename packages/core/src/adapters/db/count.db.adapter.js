const { getWhere } = require('../utils');

const countQuery = (model) => async (identifierObj, dbParams = {}) => {
  const { isDeleting = true, distinct = false, col = undefined } = dbParams;

  return model.count({
    where: getWhere(identifierObj, isDeleting),
    distinct,
    col,
  });
};

module.exports = countQuery;
