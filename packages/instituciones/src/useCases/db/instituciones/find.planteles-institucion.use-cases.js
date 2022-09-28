const { Op } = require('sequelize');
const { checkers } = require('@siiges-services/shared');

const findPlantelesInstitucion = (findOneInstitucionQuery) => async (
  identifierObj,
) => {
  const include = [
    {
      association: 'planteles',
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
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

  const plantelesInstitucion = await findOneInstitucionQuery(identifierObj, { undefined, include });
  checkers.throwErrorIfDataIsFalsy(plantelesInstitucion);
  console.log(plantelesInstitucion);

  return plantelesInstitucion;
};

module.exports = findPlantelesInstitucion;
