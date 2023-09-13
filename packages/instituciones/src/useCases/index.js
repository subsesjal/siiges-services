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
  findAllHigienes,
  findGroupPlantelHigiene,
  findAllEdificiosNiveles,
  createUpdatePlantelNiveles,
  findGroupPlantelNiveles,
  findAllSeguridad,
  findGroupPlantelSeguridad,
  createUpdatePlantelSeguridad,
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

const {
  createSaludInstitucion,
  findPlantelSaludInstituciones,
  findOneSaludInstituciones,
  deleteSaludInstitucion,
  updateSaludInstitucion,
} = require('./db/saludInstitucion');

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
  findAllHigienes,
  findGroupPlantelHigiene,
  findAllEdificiosNiveles,
  createUpdatePlantelNiveles,
  findGroupPlantelNiveles,
  createSaludInstitucion,
  findPlantelSaludInstituciones,
  findOneSaludInstituciones,
  deleteSaludInstitucion,
  updateSaludInstitucion,
  findAllSeguridad,
  findGroupPlantelSeguridad,
  createUpdatePlantelSeguridad,
};
