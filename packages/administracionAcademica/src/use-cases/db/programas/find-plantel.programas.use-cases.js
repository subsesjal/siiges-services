const { checkers } = require('@siiges-services/shared');

const findPlantelProgramas = (
  findPlantelProgramasQuery,
  include,
  whereProgramasQuery,
) => async (identifierObj) => {
  const where = whereProgramasQuery;
  where.plantelId = identifierObj.plantelId;

  const program = await findPlantelProgramasQuery(where, { include });
  if (program.length === 0) {
    checkers.throwErrorIfDataIsFalsy(null, 'Programas', Object.entries(identifierObj)[0].join(': '));
  }

  return program;
};

module.exports = findPlantelProgramas;
