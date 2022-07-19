const boom = require('@hapi/boom');

const findAll = (findAllQuery) => async () => {
  const usuarios = await findAllQuery();
  return usuarios;
};

const findOne = (findOneQuery) => async (id) => {
  const usuario = await findOneQuery(id);
  if (!usuario) {
    throw boom.notFound(
      `[usuarios:finOne]: Usuario no encontrado con id: ${id}`,
    );
  }
  return usuario;
};

const create = (createQuery) => async (data) => {
  const newUsuario = await createQuery(data);
  return newUsuario;
};

module.exports = {
  findAll,
  findOne,
  create,
};
