const {
  findAllMunicipios,
} = require('./db/municipios');

const {
  createPlantel,
  findOnePlantel,
  updatePlantel,
  deletePlantel,
  createPlantelHigiene,
  updatePlantelHigiene,
  deletePlantelHigiene,
  findGroupPlantelHigiene,

} = require('./db/planteles');

const {
  findAllInstituciones,
  findOneInstitucion,
  findOneInstitucionUsuario,
  findPlantelesInstitucion,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion,
} = require('./db/instituciones');

const {
  createRatificacionNombre,
  updateRatificacionNombre,
  findOneRatificacionNombre,
  deleteRatificacionNombre,
} = require('./db/ratificaciones');

module.exports = {
  findAllInstituciones,
  findOneInstitucion,
  findOneInstitucionUsuario,
  findPlantelesInstitucion,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion,
  findAllMunicipios,
  createPlantel,
  findOnePlantel,
  updatePlantel,
  deletePlantel,
  createPlantelHigiene,
  findOneRatificacionNombre,
  createRatificacionNombre,
  updateRatificacionNombre,
  deleteRatificacionNombre,
  updatePlantelHigiene,
  deletePlantelHigiene,
  findGroupPlantelHigiene,
};
