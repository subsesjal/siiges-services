const createUpdatePlantelHigieneSchema = require('./create-update.plantel-higiene.schema');
const deletePlantelHigieneSchema = require('./delete.plantel-higiene.schema');
const findAllHigienesSchema = require('./find-all.higienes.schema');
const findGroupPlantelHigieneSchema = require('./find-group.plantel-higiene.schema');
const createPlantelInfraestructuraSchema = require('./create.plantel-infraestructura');
const deletePlantelInfraestructuraSchema = require('./delete.plantel-infraestructura');
const findGroupPlantelInfraestructuraSchema = require('./find-group.plantel-infraestructura.schema');
const findGroupPlantelesUsuarioSchema = require('./find-group.planteles-usuario.schema');
const findAllEdificiosNivelesSchema = require('./find-all.edificios-niveles.schema');
const createUpdatePlantelNivelesSchema = require('./create-update.plantel-niveles.schema');
const findGroupPlantelNivelesSchema = require('./find-group.plantel-niveles.schema');
const createSaludInstiucionSchema = require('./create.salud-institucion.schema');
const findPlantelSaludInstiucionSchema = require('./find-plantel.salud-institucion.schema');
const findOneSaludInstiucionSchema = require('./find-one.salud-institucion.schema');
const deleteSaludInstiucionSchema = require('./delete.salud-institucion.schema');
const updateSaludInstiucionSchema = require('./update.salud-institucion.schema');

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
  createUpdatePlantelNivelesSchema,
  findGroupPlantelNivelesSchema,
  createSaludInstiucionSchema,
  findPlantelSaludInstiucionSchema,
  findOneSaludInstiucionSchema,
  deleteSaludInstiucionSchema,
  updateSaludInstiucionSchema,
};
