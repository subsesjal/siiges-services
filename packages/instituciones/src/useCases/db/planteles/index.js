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
  findOnePlantelHigieneQuery,
  findAllHigienesQuery,
  findGroupPlantelHigieneQuery,
  findAllEdificiosNivelesQuery,
  createPlantelEdificioNivelQuery,
  findOnePlantelEdificioNivelQuery,
  findAllPlantelEdificioNivelesQuery,
  deletePlantelEdificioNivelQuery,
  createPlantelHigieneQuery,
  updatePlantelHigieneQuery,
  deletePlantelHigieneQuery,
} = require('../../../adapters/db');

const createPlantel = require('./create.planteles.use-cases');
const findOnePlantel = require('./find-one.planteles.use-case');
const updatePlantel = require('./update.planteles.use-cases');
const deletePlantel = require('./delete.planteles.use-cases');
const createDirectorPlantel = require('./create.director-plantel.use-cases');
const updateDirectorPlantel = require('./update.director-plantel.use-cases');
const createPlantelHigiene = require('./create.plantel-higiene.use-cases');
const deletePlantelHigiene = require('./delete.higiene.use-cases');
const findAllHigienes = require('./find-all.higienes.use-cases');
const findGroupPlantelHigiene = require('./find-group.plantel-higiene.use-cases');
const findAllEdificiosNiveles = require('./find-all.edificios-niveles.use-cases');
const createUpdatePlantelNiveles = require('./create-update.plantel-niveles.use-cases');
const findGroupPlantelNiveles = require('./find-group.plantel-niveles.use-cases');

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
  createPlantelHigiene: createPlantelHigiene(
    findOnePlantelHigieneQuery,
    createPlantelHigieneQuery,
    updatePlantelHigieneQuery,
  ),
  deletePlantelHigiene: deletePlantelHigiene(findOnePlantelHigieneQuery, deletePlantelHigieneQuery),
  findAllHigienes: findAllHigienes(findAllHigienesQuery),
  findGroupPlantelHigiene: findGroupPlantelHigiene(findGroupPlantelHigieneQuery),
  findAllEdificiosNiveles: findAllEdificiosNiveles(findAllEdificiosNivelesQuery),
  createUpdatePlantelNiveles: createUpdatePlantelNiveles(
    findAllPlantelEdificioNivelesQuery,
    findOnePlantelEdificioNivelQuery,
    createPlantelEdificioNivelQuery,
    deletePlantelEdificioNivelQuery,
  ),
  findGroupPlantelNiveles: findGroupPlantelNiveles(
    findOnePlantelQuery,
    findAllPlantelEdificioNivelesQuery,
  ),
};
