const { findOneDatosDeProyectoSchema } = require('./find-one.datos.schema');
const { createPlanMaestroSchema } = require('./create.planes-maestros.schema');
const { createResponsablesSchema } = require('./create.responsables.schema');
const { createDatosDeProyectoSchema } = require('./create.datos.schema');
const { findOneResponsablesSchema } = require('./find-one.responsables.schema');
const { findAllPlanMaestroSchema } = require('./find-all.plan-maestro.schema');

module.exports = {
  createPlanMaestroSchema,
  createResponsablesSchema,
  createDatosDeProyectoSchema,
  findOneDatosDeProyectoSchema,
  findOneResponsablesSchema,
  findAllPlanMaestroSchema,
};
