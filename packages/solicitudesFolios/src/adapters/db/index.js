const solicitudesFolios = require('./solicitudesFolios/solicitudesFolios.db.adapters');
const solicitudesFoliosAlumnos = require('./solicitudesFoliosAlumnos/solicitudesFoliosAlumnos.db.adapters');
const tokensExternos = require('./firmaElectronica/tokensExternos.db.adapters');
const documentosFirmados = require('./firmaElectronica/documentosFirmados.db.adapters');

module.exports = {
  solicitudesFolios,
  solicitudesFoliosAlumnos,
  tokensExternos,
  documentosFirmados,
};
