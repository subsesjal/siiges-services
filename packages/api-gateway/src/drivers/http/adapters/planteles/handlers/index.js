const createPlantelHigiene = require('./create.handlers.plantel-higiene.adapters');
const updatePlantelHigiene = require('./update.handlers.plantel-higiene.adapters');
const deletePlantelHigiene = require('./delete.handlers.plantel-higiene.adapters');
const findAllPlantelHigiene = require('./find-all.handlers.higiene.adapters');
const findGroupPlantelHigiene = require('./find-group.handlers.plantel-higiene.adapters');

module.exports = {
  createPlantelHigiene,
  updatePlantelHigiene,
  deletePlantelHigiene,
  findAllPlantelHigiene,
  findGroupPlantelHigiene,
};
