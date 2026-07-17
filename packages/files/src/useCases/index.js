const { buildIdentifierObj, buildFile } = require('./features');
const { GenerarReporteAlumnosInactivos } = require('../utils/pdfs');

const deleteFile = require('./delete.files.use-cases');
const uploadFile = require('./upload.files.use-cases');
const findOneFile = require('./find-one.files.use-cases');
const generarReporteAlumnosInactivos = require('./generar-reporte-alumnos-inactivos.use-cases');

module.exports = {
  findOneFile: findOneFile(
    buildIdentifierObj,
    buildFile,
  ),
  uploadFile: uploadFile(
    buildIdentifierObj,
    buildFile,
  ),
  deleteFile,
  generarReporteAlumnosInactivos: generarReporteAlumnosInactivos(GenerarReporteAlumnosInactivos),
};
