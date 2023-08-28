const { checkers } = require('@siiges-services/shared');

const createInspectorProgramas = (
  createInspectorProgramasQuery,
  findOneInspectorQuery,
  findOneProgramasQuery,
) => async (data) => {
  const { programaId, inspectorId } = data;
  const inspector = await findOneInspectorQuery({ id: inspectorId });
  checkers.throwErrorIfDataIsFalsy(inspector, 'InspectorPrograma', inspectorId);
  const programa = await findOneProgramasQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'InspectorPrograma', programaId);

  const newInspectorProgramas = await createInspectorProgramasQuery(data);
  return newInspectorProgramas;
};

module.exports = createInspectorProgramas;
