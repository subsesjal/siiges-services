const solicitudes = require('./solicitudes/solicitudes.db.adapters');
const diligencias = require('./diligencias/diligencia.adapters');
const representantes = require('./representantes/representante.adapters');

module.exports = {
  solicitudes,
  diligencias,
  representantes,
};
