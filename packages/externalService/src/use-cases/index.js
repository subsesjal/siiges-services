const alumnosUseCases = require('./db/alumnos');
const ciclosUseCases = require('./db/ciclos');

module.exports = {
  ...alumnosUseCases,
  ...ciclosUseCases,
};
