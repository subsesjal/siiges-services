const boom = require('@hapi/boom');

const find = (findQuery) => async () => {
  const rta = await findQuery();
  return rta;
};

const findOne = (findOneQuery) => async (id) => {
  const rta = await findOneQuery(id);
  if (!rta) {
    throw boom.notFound(
      `[usuarios:finOne]: Usuario no encontrado con id: ${id}`,
    );
  }
  return rta;
};

const create = (createQuery) => async (data) => {
  const newUsuario = await createQuery(data);
  return newUsuario;
};

module.exports = {
  find,
  findOne,
  create,
};
