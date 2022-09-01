// External dependencies
const { faker } = require('@faker-js/faker');

const fakeBasicData = {
  constant: {
    string: faker.datatype.string(),
    number: faker.datatype.number(),
    UNDEFINED: undefined,
    bool: faker.datatype.boolean(),
  },
  changing: {
    string: faker.datatype.string,
    number: faker.datatype.number,
    UNDEFINED: undefined,
    bool: faker.datatype.boolean,
  },
};

const UserModelResponse = {
  id: faker.datatype.number(),
  rol_id: faker.datatype.number(12),
  usuario: faker.internet.userName(),
  correo: faker.internet.email(),
  password: faker.internet.password(),
  token_notifications: faker.datatype.string(),
  passwordUpdated: true,
  created_at: faker.date.past(5),
  update_at: faker.date.past(1),
};

const RolModelResponse = {
  nombre: faker.name.jobTitle(),
  descripcion: faker.name.jobDescriptor(),
};

const randomNumber = faker.datatype.number();

const fakeExpirationTimeToken = (
  Math.floor(Date.now / randomNumber)
  + (randomNumber * randomNumber * randomNumber)
);

const fakePayloadToken = {
  usuario: UserModelResponse.usuario,
  rol: faker.name.jobDescriptor(),
};

module.exports = {
  fakeBasicData,
  fakeExpirationTimeToken,
  fakePayloadToken,
  UserModelResponse,
  RolModelResponse,
};
