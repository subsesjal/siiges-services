const { Op } = require('sequelize');

const findOneQuery = (model) => async (identifierObj, { attributes, include } = {}) => {
  const resultQuery = await model.findOne({
    attributes,
    where: {
      ...identifierObj,
      deletedAt: {
        [Op.is]: null,
      },
    },
    include,
  });

  return resultQuery;
};

module.exports = findOneQuery;
