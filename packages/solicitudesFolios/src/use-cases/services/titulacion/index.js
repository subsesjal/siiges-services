const titulacionService = require('../../../adapters/services');
const { solicitudesFolios, solicitudesFoliosAlumnos } = require('../../../adapters/db');

const envioTitulacion = require('./send.titulos.use-cases');

module.exports = {
  envioTitulacion: envioTitulacion(
    titulacionService,
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFoliosAlumnos.updateFolioDocumentoAlumnoQuery,
  ),
};
