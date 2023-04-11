const {
  createPlantelQuery,
  findOnePlantelQuery,
  updatePlantelQuery,
  deletePlantelQuery,
  updateDomicilioQuery,
  findOneInstitucionQuery,
  createDirectorQuery,
  updatePersonaQuery,
  updateDirectorQuery,
  createHigieneQuery,
} = require('../../../adapters/db');

const createPlantel = require('./create.planteles.use-cases');
const findOnePlantel = require('./find-one.planteles.use-case');
const updatePlantel = require('./update.planteles.use-cases');
const deletePlantel = require('./delete.planteles.use-cases');
const createDirectorPlantel = require('./create.director-plantel.use-cases');
const updateDirectorPlantel = require('./update.director-plantel.use-cases');
const createPlantelHigiene = require('./create.higiene.use-cases');

module.exports = {
  createPlantel: createPlantel(
    findOneInstitucionQuery,
    createPlantelQuery,
    createDirectorQuery,
  ),
  findOnePlantel: findOnePlantel(
    findOneInstitucionQuery,
    findOnePlantelQuery,
  ),
  updatePlantel: updatePlantel(
    findOnePlantelQuery,
    updatePlantelQuery,
    updateDomicilioQuery,
    updatePersonaQuery,
  ),
  deletePlantel: deletePlantel(deletePlantelQuery),
  createDirectorPlantel: createDirectorPlantel(
    findOnePlantelQuery,
    createDirectorQuery,
  ),
  updateDirectorPlantel: updateDirectorPlantel(
    findOnePlantelQuery,
    updateDirectorQuery,
  ),
  createPlantelHigiene: createPlantelHigiene(createHigieneQuery),
};
