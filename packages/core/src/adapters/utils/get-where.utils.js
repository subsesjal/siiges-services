const { Op } = require('sequelize');

function getWhere(identifierObj, isDeleting, query) {
  if (isDeleting) return { ...identifierObj };

  return {
    ...identifierObj,
    ...query,
    deletedAt: { [Op.is]: null },
  };
}

module.exports = getWhere;
