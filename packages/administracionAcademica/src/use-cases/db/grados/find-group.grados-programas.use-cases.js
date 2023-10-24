const { checkers } = require('@siiges-services/shared');

const findGroupGrados = (
  findGroupGradosQuery,
  findOneProgramaQuery,
  findProgramaAsignaturaQuery,
) => async ({ programaId }) => {
  await checkers.findValidator({ Programa: [programaId, findOneProgramaQuery] });

  const asignaturas = await findProgramaAsignaturaQuery({ programaId });
  checkers.throwErrorIfDataIsFalsy(asignaturas.length, 'Asignatura', programaId);
  const setGrados = new Set();
  asignaturas.map((grupo) => setGrados.add(grupo.gradoId));

  const grados = await findGroupGradosQuery({ id: [...setGrados] });
  return grados;
};

module.exports = { findGroupGrados };
