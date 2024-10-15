const solicitudesFoliosUseCases = require('./db/solicitudesFolios');
const solicitudesFoliosAlumnosUseCases = require('./db/solicitudesFoliosAlumnos');
const titulacionUseCases = require('./services/titulacion');

module.exports = {
  ...solicitudesFoliosUseCases,
  ...solicitudesFoliosAlumnosUseCases,
  ...titulacionUseCases,
};
