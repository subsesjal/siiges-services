const { generateMapObservaciones } = require('./observacionSolicitud.topic');
const { generateMapFoliosAlumnos } = require('./folioDocumentosAlumnos.topic');

module.exports = {
  generateMapObservaciones,
  generateMapFoliosAlumnos,
};
