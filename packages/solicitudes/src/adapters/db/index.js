const solicitudes = require('./solicitudes/solicitudes.db.adapters');
const diligencias = require('./diligencias/diligencia.adapters');
const representantes = require('./representantes/representante.adapters');
const asignatura = require('./asignatura/asignatura.db.adapters');

module.exports = {
  solicitudes,
  diligencias,
  representantes,
  asignatura,
};
