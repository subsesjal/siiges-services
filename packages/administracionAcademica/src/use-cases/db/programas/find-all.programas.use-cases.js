const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const findAllProgramas = (
  findAllProgramasQuery,
  findOneProgramaQuery,
  include,
  whereProgramasQuery,
) => async (identifierObj) => {
  const { acuerdoRvoe } = identifierObj;

  if (acuerdoRvoe) {
    const programa = await findOneProgramaQuery(
      { acuerdoRvoe },
      {
        query: { fechaSurteEfecto: { [Op.lte]: new Date() } },
        include,
      },
    );

    checkers.throwErrorIfDataIsFalsy(programa, 'programas', acuerdoRvoe);
    return programa;
  }

  const programas = await findAllProgramasQuery(
    identifierObj,
    {
      query: whereProgramasQuery,
      include,
    },
  );
  return programas;
};

module.exports = findAllProgramas;
