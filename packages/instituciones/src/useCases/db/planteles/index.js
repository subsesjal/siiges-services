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
  findAllSeguridadQuery,
  createPlantelSeguridadQuery,
  updatePlantelSeguridadQuery,
  findOnePlantelSeguridadQuery,
  findGroupPlantelSeguridadQuery,
  createFormacionDirectorQuery,
  findOneDirectorQuery,
  findOneNivelQuery,
  findAllFormacionDirectorQuery,
  findAllFormacionQuery,
  findOneFormacionDirectorQuery,
  updateFormacionQuery,
} = require('../../../adapters/db');

const createPlantel = require('./create.planteles.use-cases');
const findOnePlantel = require('./find-one.planteles.use-case');
const findOnePlantelDetalles = require('./find-one.planteles-detalles.use-case');
const updatePlantel = require('./update.planteles.use-cases');
const deletePlantel = require('./delete.planteles.use-cases');
const createDirectorPlantel = require('./create.director-plantel.use-cases');
const updateDirectorPlantel = require('./update.director-plantel.use-cases');
const createPlantelHigiene = require('./create.plantel-higiene.use-cases');
const deletePlantelHigiene = require('./delete.plantel-higiene.use-cases');
const findAllHigienes = require('./find-all.higienes.use-cases');
const findGroupPlantelHigiene = require('./find-group.plantel-higiene.use-cases');
const findAllEdificiosNiveles = require('./find-all.edificios-niveles.use-cases');
const createUpdatePlantelNiveles = require('./create-update.plantel-niveles.use-cases');
const findGroupPlantelNiveles = require('./find-group.plantel-niveles.use-cases');
const findAllSeguridad = require('./find-all.seguridad-sistemas.use-cases');
const findGroupPlantelSeguridad = require('./find-group.plantel-seguridad.use-cases');
const createUpdatePlantelSeguridad = require('./create.plantel-seguridad.use-cases');

const {
  createFormacionDirector,
  findAllFormacionDirector,
  findOneFormacionDirector,
  updateFormacionDirector,
} = require('./formacionesDirectores');

const findFormacionDirector = findOneFormacionDirector(
  findOneDirectorQuery,
  findOneFormacionDirectorQuery,
);

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
  findOnePlantelDetalles: findOnePlantelDetalles(
    findOneInstitucionQuery,
    findOnePlantelQuery,
  ),
  updatePlantel: updatePlantel(
    findOnePlantelQuery,
    updatePlantelQuery,
    updateDomicilioQuery,
    updatePersonaQuery,
    createDirectorQuery,
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
  findAllSeguridad: findAllSeguridad(findAllSeguridadQuery),
  findGroupPlantelSeguridad: findGroupPlantelSeguridad(
    findOnePlantelQuery,
    findGroupPlantelSeguridadQuery,
  ),
  createUpdatePlantelSeguridad: createUpdatePlantelSeguridad(
    findOnePlantelQuery,
    findOnePlantelSeguridadQuery,
    createPlantelSeguridadQuery,
    updatePlantelSeguridadQuery,
  ),
  createFormacionDirector: createFormacionDirector(
    createFormacionDirectorQuery,
    findOneDirectorQuery,
    findOneNivelQuery,
  ),
  findAllFormacionDirector: findAllFormacionDirector(
    findAllFormacionDirectorQuery,
    findAllFormacionQuery,
  ),
  findOneFormacionDirector: findFormacionDirector,
  updateFormacionDirector: updateFormacionDirector(
    findFormacionDirector,
    findOneNivelQuery,
    updateFormacionQuery,
  ),
};
