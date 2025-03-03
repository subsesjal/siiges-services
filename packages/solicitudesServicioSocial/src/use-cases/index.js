const solicitudesServSocUseCases = require('./db/solicitudesServSoc');
const solicitudesServSocAlumnosUseCases = require('./db/solicitudesServSocAlumnos');

module.exports = {
  ...solicitudesServSocUseCases,
  ...solicitudesServSocAlumnosUseCases,
};
