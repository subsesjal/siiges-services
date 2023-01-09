const { Op } = require('sequelize');
const { checkers } = require('@siiges-services/shared');

function addDeleteAt(include, strict) {
  return {
    ...include,
    where: { deletedAt: { [Op.is]: null } },
    required: strict,
  };
}

function getIncludeObj(include) {
  if (checkers.isString(include)) return { association: include };
  return { ...include };
}

function createInclude(includeList, strict) {
  if (!Array.isArray(includeList)) return undefined;

  return includeList.map((include) => {
    let localInclude = getIncludeObj(include);
    localInclude = addDeleteAt(localInclude, strict);
    if (checkers.isDefined(include?.include)) {
      return {
        ...localInclude,
        include: createInclude(include.include, strict),
      };
    }

    return { ...localInclude };
  });
}

module.exports = createInclude;
