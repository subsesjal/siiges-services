const alumnos = require('./alumnos/alumno.db.adapter');
const programas = require('./programas/programa.db.adapter');
const ciclosEscolares = require('./ciclosEscolares/ciclosEscolares.db.adapter');
const grupos = require('./grupos/grupos.db.adapter');
const grados = require('./grados/grados.db.adapter');
const validaciones = require('./validaciones/validacion.db.adapter');

module.exports = {
  alumnos,
  programas,
  ciclosEscolares,
  grupos,
  grados,
  validaciones,
};
