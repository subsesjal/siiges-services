const { planesMaestros } = require('../../../adapters/db/index');

const { createDatosDeProyecto } = require('./create.datos-de-proyecto.use-case');
const { createPlanMaestro } = require('./create.plan-maestro.use-case');
const { createResponsables } = require('./create.responsables.use-case');
const { findOneDatosPlanMaestro } = require('./find-one.datos-plan-maestro.use-case');
const { updateDatosDeProyecto } = require('./update.datos-de-proyecto.use-case');
const { updatePlanMaestro } = require('./update.plan-maestro.use-case');
const { updateResponsables } = require('./update.responsables.use-case');
const { findOneResponsablesPlanMaestro } = require('./find-one.responsables-plan-maestro.use-case');

module.exports = {
  createDatosDeProyecto: createDatosDeProyecto(
    planesMaestros.createEspacioDeEquipamentoQuery,
    planesMaestros.findOnePlanMaestroQuery,
    planesMaestros.createDatosDelProyectoQuery,
    planesMaestros.createTipoDeProyectoQuery,
    planesMaestros.createContratoYCalendarioQuery,
  ),
  createPlanMaestro: createPlanMaestro(
    planesMaestros.createPlanMaestroQuery,
    planesMaestros.findOneInstitucionQuery,
    planesMaestros.findOnePeriodoQuery,
    planesMaestros.findOneSesionQuery,
  ),
  createResponsables: createResponsables(
    planesMaestros.createPlaneacionQuery,
    planesMaestros.createObraYMantenimientoQuery,
    planesMaestros.findOnePlanMaestroQuery,
    planesMaestros.findOnePlaneacionQuery,
  ),
  findOneDatosPlanMaestro: findOneDatosPlanMaestro(
    planesMaestros.findAllDatosDelProyectoQuery,
    planesMaestros.findOnePlanMaestroQuery,
  ),
  findOneResponsablesPlanMaestro: findOneResponsablesPlanMaestro(
    planesMaestros.findOnePlanMaestroQuery,
  ),
  updateDatosDeProyecto,
  updatePlanMaestro,
  updateResponsables,
};
