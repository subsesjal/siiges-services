const {
  createSaludInstitucionQuery,
  findOnePlantelQuery,
  findAllSaludInstitucionesQuery,
  findOneSaludInstitucionesQuery,
} = require('../../../adapters/db');

const createSaludInstitucion = require('./create.saludInstitucion.use-cases');
const { findPlantelSaludInstituciones } = require('./find-plantel.salud-institucion.use-cases');
const { findOneSaludInstituciones } = require('./find-one.salud-institucion.use-cases');

module.exports = {
  createSaludInstitucion: createSaludInstitucion(
    createSaludInstitucionQuery,
    findOnePlantelQuery,
  ),
  findPlantelSaludInstituciones: findPlantelSaludInstituciones(
    findAllSaludInstitucionesQuery,
  ),
  findOneSaludInstituciones: findOneSaludInstituciones(
    findOneSaludInstitucionesQuery,
  ),
};
