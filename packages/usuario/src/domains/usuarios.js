const { Op } = require('sequelize');

const findQuery = (usuarioModel) => async () => {
  const rta = await usuarioModel.findAll({
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

  return rta;
};

const findOneQuery = (usuarioModel) => async (id) => {
  const rta = await usuarioModel.findByPk(id);
  return rta;
};

const createQuery = (usuarioModel) => async (data) => {
  const newUsuario = await usuarioModel.create(data);
  return newUsuario;
};

module.exports = {
  findQuery,
  findOneQuery,
  createQuery,
};
