const { createSaludInstitucionQuery, findOnePlantelQuery } = require('../../../adapters/db');

const createSaludInstitucion = require('./create.saludInstitucion.use-cases');

module.exports = {
  createSaludInstitucion: createSaludInstitucion(
    createSaludInstitucionQuery,
    findOnePlantelQuery,
  ),
};
