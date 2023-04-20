const createUpdatePlantelHigieneSchema = require('./create-update.plantel-higiene.schema');
const deletePlantelHigieneSchema = require('./delete.plantel-higiene.schema');
const findGroupPlantelHigieneSchema = require('./find-group.plantel-higiene.schema');
const createPlantelInfraestructuraSchema = require('./create.plantel-infraestructura');
const findGroupPlantelInfraestructuraSchema = require('./find-group.plantel-infraestructura.schema');

module.exports = {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findGroupPlantelHigieneSchema,
  createPlantelInfraestructuraSchema,
  findGroupPlantelInfraestructuraSchema,
};
