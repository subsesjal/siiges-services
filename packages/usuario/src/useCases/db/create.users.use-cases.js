const createUser = (createQuery) => async (data) => {
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  },
  ];

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

  return newUser;
};

module.exports = createUser;
