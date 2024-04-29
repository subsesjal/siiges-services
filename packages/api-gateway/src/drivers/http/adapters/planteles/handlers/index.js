const createPlantelHigiene = require('./create.handlers.plantel-higiene.adapters');
const deletePlantelHigiene = require('./delete.handlers.plantel-higiene.adapters');
const findAllHigienes = require('./find-all.handlers.higienes.adapters');
const findGroupPlantelHigiene = require('./find-group.handlers.plantel-higiene.adapters');
const createPlantelInfraestructura = require('./create.handlers.plantel-infraestructura.adapters');
const updateInfraestructura = require('./update.handlers.plantel-infraestructura.adapters');
const deletePlantelInfraestructura = require('./delete.handlers.plantel-infraestructura.adapters');
const findGroupPlantelInfraestructura = require('./find-group.handlers.plantel-infraestructura.adapters');
const findOnePlantelInfraestructura = require('./find-one.handlers.plantel-infraestructura.adapters');
const findGroupPlantelesUsuario = require('./find-group.handlers.planteles-usuario.adapters');
const findAllEdificiosNiveles = require('./find-all.handlers.edificios-niveles.adapters');
const createUpdatePlantelNiveles = require('./create-update.handlers.plantel-niveles.adapters');
const findGroupPlantelNiveles = require('./find-group.handlers.plantel-niveles.adapters');
const findAllSeguridad = require('./find-all.handlers.seguridad.adapters');
const findGroupPlantelSeguridad = require('./find-group.handlers.plantel-seguridad.adapters');
const createUpdatePlantelSeguridad = require('./create-update.handlers.plantel-seguridad.adapters');
const {
  createFormacionDirector,
  findAllFormacionDirector,
  findOneFormacionDirector,
  updateFormacionDirector,
} = require('./formacionDirector');

module.exports = {
  createPlantelHigiene,
  deletePlantelHigiene,
  findAllHigienes,
  findGroupPlantelHigiene,
  createPlantelInfraestructura,
  updateInfraestructura,
  deletePlantelInfraestructura,
  findGroupPlantelInfraestructura,
  findGroupPlantelesUsuario,
  findAllEdificiosNiveles,
  createUpdatePlantelNiveles,
  findGroupPlantelNiveles,
  findAllSeguridad,
  findGroupPlantelSeguridad,
  createUpdatePlantelSeguridad,
  createFormacionDirector,
  findAllFormacionDirector,
  findOneFormacionDirector,
  updateFormacionDirector,
  findOnePlantelInfraestructura,
};
