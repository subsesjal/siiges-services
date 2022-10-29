const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');

const createUserUser = (
  createUserUserQuery,
  createUserQuery,
  findOneUserQuery,
) => async (primaryId, data) => {
  const primaryUser = await findOneUserQuery({ id: primaryId });
  checkers.throwErrorIfDataIsFalsy(primaryUser, 'usuario', primaryId);

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

  return newUser;
};

module.exports = createUserUser;
