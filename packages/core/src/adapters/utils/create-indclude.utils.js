const { Op } = require('sequelize');
const { checkers } = require('@siiges-services/shared');

function createIncludeObj(include) {
  return {
    associatation: include,
  };
}

function addDeleteAt(include) {
  return {
    ...include,
    deletedAt: { [Op.is]: null },
  };
}

function getIncludeObj(include) {
  if (checkers.isString(include)) return createIncludeObj(include);
  return { ...include };
}

function createInclude(includeList) {
  if (checkers.isFalsy(includeList)) return includeList;

  return includeList.map((include) => {
    if (checkers.isDefined(include?.include)) return createInclude(include.include);
    const localInclude = getIncludeObj(include);
    return addDeleteAt(localInclude);
  });
}

module.exports = createInclude;
