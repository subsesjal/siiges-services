/**
 * @description Export all features and business rules from the package
 */
const {
  deleteFile,
  findOneFile,
  getFileIdentifierObj,
  uploadFile,
  generarReporteAlumnosInactivosCsv,
  generarReporteAlumnosInactivosPdf,
} = require('./useCases');

module.exports = {
  deleteFile,
  findOneFile,
  getFileIdentifierObj,
  uploadFile,
  generarReporteAlumnosInactivosCsv,
  generarReporteAlumnosInactivosPdf,
};
