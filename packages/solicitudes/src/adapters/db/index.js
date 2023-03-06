const solicitudes = require('./solicitudes/solicitudes.db.adapters');
const diligencias = require('./diligencias/diligencia.adapters');
const representantes = require('./representantes/representante.adapters');
const asignaturas = require('./asignaturas/asignaturas.db.adapters');

module.exports = {
  solicitudes,
  diligencias,
  representantes,
  asignaturas,
};
