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
const createSaludInstitucionSchema = require('./create.salud-institucion.schema');
const findPlantelSaludInstitucionSchema = require('./find-plantel.salud-institucion.schema');
const findOneSaludInstitucionSchema = require('./find-one.salud-institucion.schema');
const deleteSaludInstitucionSchema = require('./delete.salud-institucion.schema');
const updateSaludInstitucionSchema = require('./update.salud-institucion.schema');
const findAllSeguridadSistemasSchema = require('./find-all.seguridad-sistemas.schema');
const findGroupPlantelSeguridadSchema = require('./find-group.plantel-seguridad.schema');
const createUpdatePlantelSeguridadSchema = require('./create-update.plantel-seguridad.schema');
const createDirectorSchema = require('./create.director-plantel.schema');
const updateDirectorSchema = require('./update.director-plantel.schema');

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
  createSaludInstitucionSchema,
  findPlantelSaludInstitucionSchema,
  findOneSaludInstitucionSchema,
  deleteSaludInstitucionSchema,
  updateSaludInstitucionSchema,
  findAllSeguridadSistemasSchema,
  findGroupPlantelSeguridadSchema,
  createUpdatePlantelSeguridadSchema,
  createDirectorSchema,
  updateDirectorSchema,
};
