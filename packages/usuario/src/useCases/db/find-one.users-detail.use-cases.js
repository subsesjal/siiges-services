const { checkers } = require('@siiges-services/shared');

const findOneUserDetail = (findOneQuery) => async (
  identifierObj,
) => {
  const include = [
    {
      association: 'persona',
      include:
        [
          {
            association: 'domicilio',
            include: [
              { association: 'estado' },
              { association: 'municipio' },
            ],
          },
        ],
    },
  ];

  const user = await findOneQuery(identifierObj, { undefined, include });
  checkers.throwErrorIfDataIsFalsy(user, 'usuario', identifierObj);
  return user;
};

module.exports = findOneUserDetail;
