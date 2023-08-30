const { encrypStringHmacAlgorithm } = require('@siiges-services/authentication');
const boom = require('@hapi/boom');

const createUser = (createQuery, findOneUserQuery, createInspector) => async (data) => {
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];
  const userExists = await findOneUserQuery({ usuario: data.usuario });
  if (userExists) {
    throw boom.conflict(`User ${data.usuario} already exists`);
  }
  // eslint-disable-next-line no-param-reassign
  data.contrasena = encrypStringHmacAlgorithm(data.contrasena);
  let newUser;

  if (!data.persona) {
    const persona = {
      nombre: 'SIN DATO',
      apellidoPaterno: 'SIN DATO',
    };

    const newData = { ...data, persona };

    newUser = await createQuery(newData, include);
  } else {
    newUser = await createQuery(data, include);
  }

  delete newUser.dataValues.contrasena;

  if (data.rolId === 6) {
    await createInspector({ personaId: newUser.personaId });
  }
  return newUser;
};

module.exports = createUser;
