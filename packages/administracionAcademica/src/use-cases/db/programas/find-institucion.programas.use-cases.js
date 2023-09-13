const { checkers } = require('@siiges-services/shared');
const { findPlantelProgramas } = require('./find-plantel.programas.use-cases');

const findInstitucionProgramas = (findInstitucionQuery, plantelQuery) => async (identifierObj) => {
  const institucion = await findInstitucionQuery(identifierObj, { attributes: ['id'] });
  if (institucion.length === 0) {
    checkers.throwErrorIfDataIsFalsy(null, 'Programas', Object.entries(identifierObj)[0].join(': '));
  }
  const institucionId = institucion.map((item) => item.id);
  const [find, include, where] = plantelQuery;

  const program = await findPlantelProgramas(find, include, where)(institucionId);
  return program;
};

module.exports = findInstitucionProgramas;
