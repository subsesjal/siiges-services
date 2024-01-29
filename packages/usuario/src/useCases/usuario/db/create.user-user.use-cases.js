const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');
const { encrypStringHmacAlgorithm } = require('@siiges-services/authentication');

const createUserUser = (
  createUserUserQuery,
  createUserQuery,
  findOneUserQuery,
) => async (primaryId, data) => {
  const primaryUser = await findOneUserQuery({ id: primaryId });
  checkers.throwErrorIfDataIsFalsy(primaryUser, 'usuario', primaryId);

  const existingUser = await findOneUserQuery({ usuario: data.usuario });
  if (existingUser) {
    throw boom.conflict(`User ${data.usuario} already exist`);
  }

  if (primaryUser.rolId !== 3) {
    throw boom.notFound(
      `[Usuarios]: can't found 'usuario' with id '${primaryId}' as 'representante'`,
    );
  }

  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  },
  ];

  // eslint-disable-next-line no-param-reassign
  data.contrasena = encrypStringHmacAlgorithm(data.contrasena);
  let newUser;

  if (!data.persona) {
    const persona = {
      nombre: 'SIN DATO',
      apellidoPaterno: 'SIN DATO',
    };

    const newData = { ...data, persona };

    newUser = await createUserQuery(newData, include);
  } else {
    newUser = await createUserQuery(data, include);
  }

  await createUserUserQuery({ principalId: primaryId, secundarioId: newUser.id });

  delete newUser.dataValues.contrasena;
  return newUser;
};

module.exports = createUserUser;
