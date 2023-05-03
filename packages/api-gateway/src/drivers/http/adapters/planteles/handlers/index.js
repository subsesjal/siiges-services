const createPlantelHigiene = require('./create.handlers.plantel-higiene.adapters');
const updatePlantelHigiene = require('./update.handlers.plantel-higiene.adapters');
const deletePlantelHigiene = require('./delete.handlers.plantel-higiene.adapters');
const findAllHigienes = require('./find-all.handlers.higienes.adapters');
const findGroupPlantelHigiene = require('./find-group.handlers.plantel-higiene.adapters');
const createPlantelInfraestructura = require('./create.handlers.plantel-infraestructura.adapters');
const deletePlantelInfraestructura = require('./delete.handlers.plantel-infraestructura.adapters');
const findGroupPlantelInfraestructura = require('./find-group.handlers.plantel-infraestructura.adapters');
const findGroupPlantelesUsuario = require('./find-group.handlers.planteles-usuario.adapters');

module.exports = {
  createPlantelHigiene,
  updatePlantelHigiene,
  deletePlantelHigiene,
  findAllHigienes,
  findGroupPlantelHigiene,
  createPlantelInfraestructura,
  deletePlantelInfraestructura,
  findGroupPlantelInfraestructura,
  findGroupPlantelesUsuario,
};
