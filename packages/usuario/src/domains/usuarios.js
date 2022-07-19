const { Op } = require('sequelize');

const findAllQuery = (usuarioModel) => async () => {
  const usuarios = await usuarioModel.findAll({
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
    /* include: [
      {
        association: 'customer',
        include: ['user'],
      },
    ], */
  });

  return usuarios;
};

const findOneQuery = (usuarioModel) => async (id) => {
  const usuario = await usuarioModel.findByPk(id);
  return usuario;
};

const createQuery = (usuarioModel) => async (data) => {
  const newUsuario = await usuarioModel.create(data);
  return newUsuario;
};

module.exports = {
  findAllQuery,
  findOneQuery,
  createQuery,
};
