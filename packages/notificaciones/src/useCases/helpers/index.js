const { generateMapObservaciones } = require('./observacionSolicitud.topic');
const { generateMapFoliosAlumnos } = require('./folioDocumentosAlumnos.topic');
const { generateMapPreRegisterUser } = require('./preregistroUsuario.topic');

module.exports = {
  generateMapObservaciones,
  generateMapFoliosAlumnos,
  generateMapPreRegisterUser,
};
