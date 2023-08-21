const createUpdatePlantelHigieneSchema = require('./create-update.plantel-higiene.schema');
const deletePlantelHigieneSchema = require('./delete.plantel-higiene.schema');
const findAllHigienesSchema = require('./find-all.higienes.schema');
const findGroupPlantelHigieneSchema = require('./find-group.plantel-higiene.schema');
const createPlantelInfraestructuraSchema = require('./create.plantel-infraestructura');
const deletePlantelInfraestructuraSchema = require('./delete.plantel-infraestructura');
const findGroupPlantelInfraestructuraSchema = require('./find-group.plantel-infraestructura.schema');
const findGroupPlantelesUsuarioSchema = require('./find-group.planteles-usuario.schema');
const findAllEdificiosNivelesSchema = require('./find-all.edificios-niveles.schema');

module.exports = {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findAllHigienesSchema,
  findGroupPlantelHigieneSchema,
  createPlantelInfraestructuraSchema,
  deletePlantelInfraestructuraSchema,
  findGroupPlantelInfraestructuraSchema,
  findGroupPlantelesUsuarioSchema,
  findAllEdificiosNivelesSchema,
};
