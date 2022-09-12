const { Op } = require('sequelize');

const findAllQuery = (usuarioModel) => async (attributes, include) => {
  const usuarios = await usuarioModel.findAll({
    attributes,
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
    include,
  });

  return usuarios;
};

module.exports = findAllQuery;
