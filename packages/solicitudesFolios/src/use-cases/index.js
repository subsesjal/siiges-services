const solicitudesFoliosUseCases = require('./db/solicitudesFolios');
const solicitudesFoliosAlumnosUseCases = require('./db/solicitudesFoliosAlumnos');
const titulacionUseCases = require('./services/titulacion');
const firmaElectronicaDbUseCases = require('./db/firmaElectronica');
const firmaElectronicaUseCases = require('./services/firmaElectronica');

module.exports = {
  ...solicitudesFoliosUseCases,
  ...solicitudesFoliosAlumnosUseCases,
  ...titulacionUseCases,
  ...firmaElectronicaDbUseCases,
  ...firmaElectronicaUseCases,
};
