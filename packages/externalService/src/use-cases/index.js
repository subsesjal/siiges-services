const alumnosUseCases = require('./db/alumnos');
const ciclosUseCases = require('./db/ciclos');
const gruposUseCases = require('./db/grupos');

module.exports = {
  ...alumnosUseCases,
  ...ciclosUseCases,
  ...gruposUseCases,
};
