const { faker } = require('@faker-js/faker');

const file = {
  id: faker.datatype.number(),
  entidadId: faker.datatype.number(),
  tipoEntidadId: faker.datatype.number(),
  nombre: faker.system.fileName(),
  ubicacion: faker.system.filePath(),
  createdAt: faker.date.past(),
  updateAt: faker.date.recent(),
};

const documentType = {
  id: faker.datatype.number(),
  name: faker.system.fileType(),
};

const entityType = {
  id: faker.datatype.number(),
  name: faker.commerce.productAdjective(),
};

const identifierObj = {
  entidadId: faker.datatype.number(),
  tipoEntidadId: entityType.id,
  tipoDocumentoId: documentType.id,
};

module.exports = {
  file,
  entityType,
  documentType,
  identifierObj,
};
