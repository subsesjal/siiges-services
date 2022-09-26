const { Op } = require('sequelize');

const findAllQuery = (model) => async (attributes, include) => {
  const result = await model.findAll({
    attributes,
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
    include,
  });

  return result;
};

module.exports = findAllQuery;
