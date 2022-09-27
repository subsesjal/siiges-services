const { faker } = require('@faker-js/faker');

const file = {
  id: faker.datatype.number(),
  entidad_id: faker.datatype.number(),
  tipo_entidad_id: faker.datatype.number(),
  nombre: faker.system.fileName(),
  ubicacion: faker.system.filePath(),
  created_at: faker.date.past(),
  update_at: faker.date.recent(),
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
  entidad_id: faker.datatype.number(),
  tipo_entidad_id: entityType.id,
  tipo_documento_id: documentType.id,
};

module.exports = {
  file,
  entityType,
  documentType,
  identifierObj,
};
