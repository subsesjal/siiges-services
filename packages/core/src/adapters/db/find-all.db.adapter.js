// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const { createInclude } = require('../utils');

const findAllQuery = (usuarioModel) => async (attributes, include) => {
  const usuarios = await usuarioModel.findAll({
    attributes,
    where: {
      deletedAt: { [Op.is]: null },
    },
    include: createInclude(include),
  });

  return usuarios;
};

module.exports = findAllQuery;
