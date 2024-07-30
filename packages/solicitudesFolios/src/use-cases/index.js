const solicitudesFoliosUseCases = require('./db/solicitudesFolios');
const solicitudesFoliosAlumnosUseCases = require('./db/solicitudesFoliosAlumnos');

module.exports = {
  ...solicitudesFoliosUseCases,
  ...solicitudesFoliosAlumnosUseCases,
};
