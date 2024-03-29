const { planesMaestros } = require('../../../adapters/db/index');

const { createDatosDeProyecto } = require('./create.datos-de-proyecto.use-case');
const { createPlanMaestro } = require('./create.plan-maestro.use-case');
const { createResponsables } = require('./create.responsables.use-case');
const { findOneDatosPlanMaestro: findOneDatosPlanMaestroQuery } = require('./find-one.datos-plan-maestro.use-case');
const { updateDatosDeProyecto } = require('./update.datos-de-proyecto.use-case');
const { updatePlanMaestro } = require('./update.plan-maestro.use-case');
const { updateResponsables } = require('./update.responsables.use-case');
const { findOneResponsablesPlanMaestro } = require('./find-one.responsables-plan-maestro.use-case');
const { findAllPlanMaestro } = require('./find-all.plan-maestro.use-case');

const findOneDatosPlanMaestro = findOneDatosPlanMaestroQuery(
  planesMaestros.findAllProyectoQuery,
  planesMaestros.findOnePlanMaestroQuery,
);
module.exports = {
  createDatosDeProyecto: createDatosDeProyecto(
    planesMaestros.createProyectoEspacioQuery,
    planesMaestros.findOnePlanMaestroQuery,
    planesMaestros.createProyectoQuery,
    planesMaestros.createTipoProyectoQuery,
    planesMaestros.createContratoQuery,
    planesMaestros.findOneTipoProyectoQuery,
    findOneDatosPlanMaestro,
  ),
  createPlanMaestro: createPlanMaestro(
    planesMaestros.createPlanMaestroQuery,
    planesMaestros.findOneInstitucionQuery,
    planesMaestros.findOnePeriodoQuery,
    planesMaestros.findOneSesionQuery,
  ),
  createResponsables: createResponsables(
    planesMaestros.createResponsablePlaneacionQuery,
    planesMaestros.createResponsableObraQuery,
    planesMaestros.findOnePlanMaestroQuery,
    planesMaestros.findOneResponsablePlaneacionQuery,
  ),
  findOneDatosPlanMaestro,
  findOneResponsablesPlanMaestro: findOneResponsablesPlanMaestro(
    planesMaestros.findOnePlanMaestroQuery,
  ),
  findAllPlanMaestro: findAllPlanMaestro(
    planesMaestros.findAllPlanMaestroQuery,
  ),
  updateDatosDeProyecto,
  updatePlanMaestro,
  updateResponsables,
};
