const { checkers } = require('@siiges-services/shared');

const findInstitucionProgramas = (
  findPlantelQuery,
  findPlantelProgramasQuery,
  include,
  whereProgramasQuery,
) => async (identifierObj) => {
  const planteles = await findPlantelQuery(identifierObj, { attributes: ['id'] });
  if (planteles.length === 0) {
    checkers.throwErrorIfDataIsFalsy(null, 'Planteles', Object.entries(identifierObj)[0].join(': '));
  }

  const plantelIds = planteles.map((item) => item.id);

  const programas = await findPlantelProgramasQuery(null, {
    query: {
      ...whereProgramasQuery,
      plantelId: plantelIds,
    },
    include,
  });

  return programas;
};

module.exports = findInstitucionProgramas;
