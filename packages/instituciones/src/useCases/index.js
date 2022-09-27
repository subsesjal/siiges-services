const {
  findAllInstitucionesQuery,
  findOneInstitucionQuery,
  createInstitucionQuery,
  updateInstitucionQuery,
  deleteInstitucionQuery,
  createPlantelInstitucionQuery,
} = require('../adapters/db');

const findAllInstituciones = require('./db/instituciones/find-all.instituciones.use-cases');
const findOneInstitucion = require('./db/instituciones/find-one.instituciones.use-cases');
const createInstitucion = require('./db/instituciones/create.instituciones.use-cases');
const updateInstitucion = require('./db/instituciones/update.instituciones.use-cases');
const deleteInstitucion = require('./db/instituciones/delete.instituciones.use-cases');
const createPlantelInstitucion = require('./db/planteles/create.plantel-institucion.use-cases');

module.exports = {
  findAllInstituciones: findAllInstituciones(findAllInstitucionesQuery),
  findOneInstitucion: findOneInstitucion(findOneInstitucionQuery),
  createInstitucion: createInstitucion(createInstitucionQuery),
  updateInstitucion: updateInstitucion(updateInstitucionQuery),
  deleteInstitucion: deleteInstitucion(deleteInstitucionQuery),
  createPlantelInstitucion: createPlantelInstitucion(
    findOneInstitucionQuery,
    createPlantelInstitucionQuery,
  ),
};
