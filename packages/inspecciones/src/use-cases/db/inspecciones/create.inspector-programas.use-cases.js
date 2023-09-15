const { checkers } = require('@siiges-services/shared');

const createInspectorProgramas = (
  createInspectorProgramasQuery,
  findOneInspectorQuery,
  findOneProgramaQuery,
  findOneInspeccionQuery,
) => async (data) => {
  const { programaId, inspectorId, inspeccionId } = data;

  const inspector = await findOneInspectorQuery({ id: inspectorId });
  checkers.throwErrorIfDataIsFalsy(inspector, 'inspectores', inspectorId);

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const inspeccion = await findOneInspeccionQuery({ id: inspeccionId });
  checkers.throwErrorIfDataIsFalsy(inspeccion, 'inspecciones', inspeccionId);

  const newInspectorProgramas = await createInspectorProgramasQuery(data);
  return newInspectorProgramas;
};

module.exports = createInspectorProgramas;
