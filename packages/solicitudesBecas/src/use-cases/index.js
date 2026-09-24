const solicitudesBecasUseCases = require('./db/solicitudesBecas');
const solicitudesBecasAlumnosUseCases = require('./db/solicitudesBecasAlumnos');
const beneficiariosBecasUseCases = require('./db/beneficiariosBecas');

module.exports = {
  ...solicitudesBecasUseCases,
  ...solicitudesBecasAlumnosUseCases,
  ...beneficiariosBecasUseCases,
};
