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
} = models;

module.exports = {
  createEvaluacionQuery: createQuery(Evaluacion),
  findOneEvaluacionQuery: findOneQuery(Evaluacion),
  updateEvaluacionQuery: updateAndFindQuery(Evaluacion),
  findOneProgramaQuery: findOneQuery(Programa),
  findOneEvaluadorQuery: findOneQuery(Evaluador),
  findOneCumplimientodQuery: findOneQuery(Cumplimiento),
  findAllEvaluadoresQuery: findAllQuery(Evaluador),
  findAllCumplimientosQuery: findAllQuery(Cumplimiento),
};
