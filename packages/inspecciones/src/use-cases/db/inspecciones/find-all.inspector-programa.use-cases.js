const findAllInspectoresProgramas = (findAllInspectorProgramasQuery) => async () => {
  const inspectoresProgramas = await findAllInspectorProgramasQuery();

  return inspectoresProgramas;
};

module.exports = findAllInspectoresProgramas;
