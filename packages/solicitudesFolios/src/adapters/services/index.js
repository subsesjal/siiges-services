const titulacion = require('./titulacion/titulacion.services.adapters');
const firmaElectronica = require('./firmaElectronica');

module.exports = {
  ...titulacion,
  ...firmaElectronica,
};
