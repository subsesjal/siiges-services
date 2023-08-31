const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');

const updateInspectoresProgramas = (
  findOneInspectoresProgramasQuery,
  updateInspectoresProgramasQuery,
) => async (identifierObj) => {
  const { id, body } = identifierObj;
  const inspectorProgram = await findOneInspectoresProgramasQuery({ id });
  checkers.throwErrorIfDataIsFalsy(inspectorProgram, 'inspectorProgram', id);
  let updateInspectorProgram = null;
  try {
    updateInspectorProgram = await Promise.all([
      updateInspectoresProgramasQuery({ id }, body),
    ]);
  } catch (err) {
    throw boom.conflict(`Parameter value in ${Object.keys(body).toString()} don't exists`);
  }
  return updateInspectorProgram;
};

module.exports = updateInspectoresProgramas;
