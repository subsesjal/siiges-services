const boom = require('@hapi/boom');

const findAllUsuarios = (findAllQuery) => async () => {
  const usuarios = await findAllQuery();
  return usuarios;
};

const findOneUsuario = (findOneQuery) => async (id) => {
  const usuario = await findOneQuery(id);
  if (!usuario) {
    throw boom.notFound(
      `[usuarios:finOne]: Usuario no encontrado con id: ${id}`,
    );
  }
  return usuario;
};

const findOneUsuarioDetailed = (findOneDetailedQuery) => async (id) => {
  const usuario = await findOneDetailedQuery(id);
  if (!usuario) {
    throw boom.notFound(
      `[usuarios:finOne]: Usuario no encontrado con id: ${id}`,
    );
  }
  return usuario;
};

const createUsuario = (createQuery) => async (data) => {
  const newUsuario = await createQuery(data);
  return newUsuario;
};

const updateUsuario = (updateQuery) => async (id, data) => {
  const usuarioUpdated = await updateQuery(id, data);
  return usuarioUpdated;
};

const deleteUsuario = (deleteQuery) => async (id) => {
  const usuarioDeleted = await deleteQuery(id);
  return usuarioDeleted;
};

module.exports = {
  findAllUsuarios,
  findOneUsuario,
  findOneUsuarioDetailed,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
