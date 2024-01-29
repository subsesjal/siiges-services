const { createPlanMaestro } = require('./create.handlers.plan-maestro.adapters');
const { createResponsables } = require('./create.handlers.representante.adapters');
const { createDatosDeProyecto } = require('./create.handlers.datos-de-proyecto.adapters');
const { findOneDatosPlanMaestro } = require('./find-one.handlers.datos-plan-maestro.adapters');
const { findOneResponsablesPlanMaestro } = require('./find-one.handlers.responsables-plan-maestro.adapters');
const { findAllPlanMaestro } = require('./find-all.handlers.plan-maestro.adapters');

module.exports = {
  createPlanMaestro,
  createResponsables,
  createDatosDeProyecto,
  findOneDatosPlanMaestro,
  findOneResponsablesPlanMaestro,
  findAllPlanMaestro,
};
