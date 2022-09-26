const {
  findAllInstitucionesQuery,
  findOneInstitucionQuery,
  createInstitucionQuery,
  updateInstitucionQuery,
  // deleteQuery,
} = require('../adapters/db');

const findAllInstituciones = require('./db/find-all.instituciones.use-cases');
const findOneInstitucion = require('./db/find-one.instituciones.use-cases');
const createInstitucion = require('./db/create.instituciones.use-cases');
const updateInstitucion = require('./db/update.instituciones.use-cases');
// const deleteInstitucion = require('./db/delete.instituciones.use-cases');

module.exports = {
  findAllInstituciones: findAllInstituciones(findAllInstitucionesQuery),
  findOneInstitucion: findOneInstitucion(findOneInstitucionQuery),
  createInstitucion: createInstitucion(createInstitucionQuery),
  updateInstitucion: updateInstitucion(updateInstitucionQuery),
  // deleteInstitucion: deleteInstitucion(deleteQuery)
};
