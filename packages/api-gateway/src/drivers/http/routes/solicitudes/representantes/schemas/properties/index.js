const domicilio = require('./domicilio.properties');
const persona = require('./persona.properties');
const representante = require('./representante');
const solicitud = require('./solicitud.propeties');
const usuario = require('./usuario.properties');

module.exports = {
  ...domicilio,
  ...persona,
  ...representante,
  ...solicitud,
  ...usuario,
};
