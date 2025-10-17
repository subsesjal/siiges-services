// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Solicitud,
  Infraestructura,
  InfraestructuraPrograma,
  PlantelHigiene,
  SaludInstitucion,
} = models;

const {
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  findOneSolicitudProgramaQuery: findOneQuery(Solicitud),
  findAllInfraestructura: findAllQuery(Infraestructura),
  findAllInfraestructuraPrograma: findAllQuery(InfraestructuraPrograma),
  findOneInfraestructura: findOneQuery(Infraestructura),
  findPlantelHigieneByPlantelId: findAllQuery(PlantelHigiene),
  findSaludInstitucionesByPlantelId: findAllQuery(SaludInstitucion),
};
