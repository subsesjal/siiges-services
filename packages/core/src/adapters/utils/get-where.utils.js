const { Op } = require('sequelize');

function getWhere(identifierObj, isDeleting) {
  if (isDeleting) return { ...identifierObj };

  return {
    ...identifierObj,
    deletedAt: { [Op.is]: null },
  };
}

module.exports = getWhere;
