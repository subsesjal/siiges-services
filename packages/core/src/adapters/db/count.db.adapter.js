const { Op } = require('sequelize');
const { getWhere } = require('../utils');

const countQuery = (model) => async (identifierObj, dbParams = {}) => {
  const {
    isDeleting = true,
    distinct = false,
    col = undefined,
    searchText,
    searchColumn,
    searchType = 'string',
  } = dbParams;

  const query = searchText && searchColumn ? {
    [searchColumn]: searchType === 'date'
      ? { [Op.between]: [new Date(`${searchText}-01-01T00:00:00`), new Date(`${searchText}-12-31T23:59:59`)] }
      : { [Op.like]: `${searchText}` },
  } : {};

  const whereClause = getWhere(identifierObj, isDeleting, query);

  return model.count({
    where: whereClause,
    distinct,
    col,
  });
};

module.exports = countQuery;
