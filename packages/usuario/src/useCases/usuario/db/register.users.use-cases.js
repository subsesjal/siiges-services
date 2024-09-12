const { encrypStringHmacAlgorithm } = require('@siiges-services/authentication');
const boom = require('@hapi/boom');

const REPRESENTANTE_LEGAL = 3;

const registerUser = (
  createQuery,
  findOneUserQuery,
) => async (data) => {
  const include = [{ association: 'persona' }];
  const userExists = await findOneUserQuery({ usuario: data.usuario });
  if (userExists) {
    throw boom.conflict(`User ${data.usuario} already exists`);
  }

  const newData = { ...data };
  newData.contrasena = encrypStringHmacAlgorithm(data.contrasena);
  newData.persona = {
    nombre: 'SIN DATO',
    apellidoPaterno: 'SIN DATO',
  };
  newData.rolId = REPRESENTANTE_LEGAL;

  const newUser = await createQuery(newData, include);
  delete newUser.dataValues.contrasena;
  return newUser;
};

module.exports = registerUser;
