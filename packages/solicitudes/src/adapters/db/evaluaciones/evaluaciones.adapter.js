const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
} = queries;

const {
  Evaluacion,
  Programa,
  Evaluador,
  Cumplimiento,
  Modalidad,
} = models;

module.exports = {
  createEvaluacionQuery: createQuery(Evaluacion),
  findOneEvaluacionQuery: findOneQuery(Evaluacion),
  updateEvaluacionQuery: updateAndFindQuery(Evaluacion),
  findOneProgramaQuery: findOneQuery(Programa),
  findOneEvaluadorQuery: findOneQuery(Evaluador),
  findOneModalidadQuery: findOneQuery(Modalidad),
  findOneCumplimientodQuery: findOneQuery(Cumplimiento),
  findAllEvaluadoresQuery: findAllQuery(Evaluador),
  findAllCumplimientosQuery: findAllQuery(Cumplimiento),
};
