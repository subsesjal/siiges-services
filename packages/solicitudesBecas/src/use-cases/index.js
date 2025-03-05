const solicitudesBecasUseCases = require('./db/solicitudesBecas');
const solicitudesBecasAlumnosUseCases = require('./db/solicitudesBecasAlumnos');

module.exports = {
  ...solicitudesBecasUseCases,
  ...solicitudesBecasAlumnosUseCases,
};
