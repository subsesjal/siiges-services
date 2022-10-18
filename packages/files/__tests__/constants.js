const {
  documentType,
  entityType,
  identifierObj,
  file,
} = require('./query-response');

const fileData = {
  entidadId: identifierObj.entidadId,
  tipoEntidad: entityType.name,
  tipoDocumento: documentType.name,
};

const tipoDocumento = documentType.name;
const tipoEntidad = entityType.name;

const uploadFileData = {
  entidadId: identifierObj.entidadId,
  nombre: file.nombre,
  tipoDocumentoId: documentType.id,
  tipoEntidadId: entityType.id,
  ubicacion: `/uploads/${tipoEntidad}/${tipoDocumento}/${file.nombre}`,
};

module.exports = {
  fileData,
  uploadFileData,
};
