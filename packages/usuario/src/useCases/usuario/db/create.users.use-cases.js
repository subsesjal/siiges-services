const { encrypStringHmacAlgorithm } = require('@siiges-services/authentication');

const createUser = (createQuery) => async (data) => {
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

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
  return newUser;
};

module.exports = createUser;
