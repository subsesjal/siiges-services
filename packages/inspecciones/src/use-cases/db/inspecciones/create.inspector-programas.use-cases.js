const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');

const createInspectorProgramas = (
  createInspectorProgramasQuery,
  createInspeccionQuery,
  findOneInspectorQuery,
  findOneProgramaQuery,
  findOneInspectoresProgramasQuery,
) => async (data) => {
  const { programaId, inspectorId } = data;

  const inspectorPrograma = await findOneInspectoresProgramasQuery(
    { programaId },
  );

  if (inspectorPrograma) {
    throw boom.conflict('Inspeccion has already been assigned');
  }

  const inspector = await findOneInspectorQuery({ id: inspectorId });
  checkers.throwErrorIfDataIsFalsy(inspector, 'inspectores', inspectorId);

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const inspeccion = await createInspeccionQuery(data);
  checkers.throwErrorIfDataIsFalsy(inspeccion, 'inspecciones', inspeccion.id);

  const newInspectorProgramas = await createInspectorProgramasQuery({
    ...data,
    inspeccionId: inspeccion.id,
  });
  checkers.throwErrorIfDataIsFalsy(newInspectorProgramas, 'inspectoresProgramas', newInspectorProgramas.id);

  return newInspectorProgramas;
};

module.exports = createInspectorProgramas;
