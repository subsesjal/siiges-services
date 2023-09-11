const { createSaludInstitucionQuery, findOnePlantelQuery, findAllSaludInstitucionesQuery } = require('../../../adapters/db');

const createSaludInstitucion = require('./create.saludInstitucion.use-cases');
const { findPlantelSaludInstituciones } = require('./find-plantel.salud-institucion.use-cases');

module.exports = {
  createSaludInstitucion: createSaludInstitucion(
    createSaludInstitucionQuery,
    findOnePlantelQuery,
  ),
  findPlantelSaludInstituciones: findPlantelSaludInstituciones(
    findAllSaludInstitucionesQuery,
  ),
};
