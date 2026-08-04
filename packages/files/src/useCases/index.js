const { buildIdentifierObj, buildFile } = require('./features');
const { GenerarReporteAlumnosInactivos } = require('../utils/pdfs');
const { GenerarReporteAlumnosInactivosCSV } = require('../utils/csvs');

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
  generarReporteAlumnosInactivosCsv: generarReporteAlumnosInactivos(
    GenerarReporteAlumnosInactivosCSV,
  ),
  generarReporteAlumnosInactivosPdf: generarReporteAlumnosInactivos(
    GenerarReporteAlumnosInactivos,
  ),
};
