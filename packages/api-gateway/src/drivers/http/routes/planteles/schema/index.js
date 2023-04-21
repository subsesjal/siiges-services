const createUpdatePlantelHigieneSchema = require('./create-update.plantel-higiene.schema');
const deletePlantelHigieneSchema = require('./delete.plantel-higiene.schema');
const findGroupPlantelHigieneSchema = require('./find-group.plantel-higiene.schema');
const createPlantelInfraestructuraSchema = require('./create.plantel-infraestructura');
const findGroupPlantelesUsuarioSchema = require('./find-group.planteles-usuario.schema');

module.exports = {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findGroupPlantelHigieneSchema,
  createPlantelInfraestructuraSchema,
  findGroupPlantelesUsuarioSchema,
};
