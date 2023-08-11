// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const {
  apiKey,
  updateToken,
  downServer,
  upServer,
  statusCodeName,
  createUserAndToken,
} = require('./utils/fixtures/server');
const { upSeed, downSeed } = require('./utils/umzug');
const {
  createUser,
  loginUser,
  userPasswordIncorrect,
  errorPasswordUserCreate,
  errorUserCreate,
  createUserWithoutPerson,
  errorMessage,
  updateUserInformation,
  createUserInitial,
} = require('./utils/fixtures/users');
const { models } = require('../packages/core/src/drivers/db/connection');

describe('test for users', () => {
  let api = null;
  let token = null;
  let id = null;
  let headers = null;
  beforeAll(async () => {
    api = supertest(await upServer());
    await upSeed();
  }, 100000);
  describe('[POST] /api/v1/usuarios', () => {
    it('should new user', async () => {
      const { body, statusCode } = await api.post('/api/v1/usuarios')
        .send(createUser)
        .set(apiKey);
      id = body.data.id;
      const data = await models.Usuario.findByPk(id);
      expect(statusCode).toEqual(statusCodeName.created);
      expect(body.data.usuario).toEqual(data.usuario);
    });
    it('should exists user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(createUser)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.conflict);
      expect(body.message).toEqual(`User ${createUser.usuario} already exists`);
    });
    it('should values name null', async () => {
      const { body } = await api.post('/api/v1/usuarios')
        .send(createUserWithoutPerson)
        .set(apiKey);
      expect(body.data.persona.nombre).toEqual('SIN DATO');
    });
    it('should error password user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(errorPasswordUserCreate)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.badRequest);
      expect(body.message).toEqual('body/contrasena must match pattern "^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$"');
    });
    it('should error create user', async () => {
      const { statusCode, body } = await api.post('/api/v1/usuarios')
        .send(errorUserCreate)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.badRequest);
      expect(body.message).toEqual('body/usuario must NOT have fewer than 3 characters');
    });
  });

  describe('[POST] /api/v1/auth/login', () => {
    it('should login', async () => {
      const { body, statusCode } = await api.post('/api/v1/auth/login')
        .send(loginUser)
        .set(apiKey);
      token = body.token;
      headers = updateToken(token);
      expect(statusCode).toEqual(statusCodeName.ok);
      expect(body.data.usuario).toEqual(loginUser.usuario);
    });
    it('should Unauthorized access', async () => {
      const { statusCode, body } = await api.post('/api/v1/auth/login')
        .send(userPasswordIncorrect)
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.unauthorized);
      expect(body.message).toEqual('Unauthorized');
    });
  });

  describe('[GET] /api/v1/usuarios/', () => {
    it('should all users', async () => {
      const { body: users, statusCode } = await api.get('/api/v1/usuarios/')
        .set(headers);
      const { count: usersDataCount } = await models.Usuario.findAndCountAll();
      expect(users.data.length).toEqual(usersDataCount);
      expect(statusCode).toEqual(statusCodeName.ok);
    });
    it('should Unauthorized access', async () => {
      const { statusCode, body: error } = await api.get('/api/v1/usuarios/').set(apiKey);
      expect(statusCode).toEqual(statusCodeName.unauthorized);
      expect(error.message).toEqual('Autorization token header[Bearer] is missing!');
    });
  });

  describe('[GET] /api/v1/usuarios/:{id}', () => {
    it('should a user', async () => {
      const { body: dataUser, statusCode } = await api.get(`/api/v1/usuarios/${id}`)
        .set(headers);
      expect(dataUser.data.id).toEqual(id);
      expect(dataUser.data.usuario).toEqual(loginUser.usuario);
      expect(statusCode).toEqual(statusCodeName.ok);
    });
    it('should user not found', async () => {
      const { body: error, statusCode } = await api.get('/api/v1/usuarios/-1').set(headers);
      expect(statusCode).toEqual(statusCodeName.notFound);
      expect(error.message).toEqual(errorMessage.userError);
    });
    it('should usuarioId must be integer', async () => {
      const { body: error, statusCode } = await api.get('/api/v1/usuarios/sca').set(headers);
      expect(error.message).toEqual(errorMessage.userIntegerError);
      expect(statusCode).toEqual(statusCodeName.badRequest);
    });
  });

  describe('[GET] /api/v1/usuarios/:{id}/detalle', () => {
    it('should a user detail', async () => {
      const { body, statusCode } = await api.get(`/api/v1/usuarios/${id}/detalle`)
        .set(headers);
      expect(statusCode).toEqual(statusCodeName.ok);
      expect(body.data.persona.nombre).toEqual(createUser.persona.nombre);
    });
    it('should user not found', async () => {
      const { body: error, statusCode } = await api.get('/api/v1/usuarios/-1/detalle').set(headers);
      expect(statusCode).toEqual(statusCodeName.notFound);
      expect(error.message).toEqual(errorMessage.userError);
    });
    it('should usuarioId must be integer', async () => {
      const { body: error, statusCode } = await api.get('/api/v1/usuarios/sca/detalle').set(headers);
      expect(error.message).toEqual(errorMessage.userIntegerError);
      expect(statusCode).toEqual(statusCodeName.badRequest);
    });
  });

  describe('[PATCH] /api/v1/usuarios/:{id}', () => {
    it('should a user update', async () => {
      const { body, statusCode } = await api.patch(`/api/v1/usuarios/${id}`)
        .set(headers)
        .send(updateUserInformation);
      const person = body.data.persona;
      expect(statusCode).toEqual(statusCodeName.ok);
      expect(person.apellidoMaterno).toEqual(updateUserInformation.persona.apellidoMaterno);
      expect(person.domicilio.codigoPostal)
        .toEqual(updateUserInformation.persona.domicilio.codigoPostal);
      expect(person.domicilio.colonia).toEqual(updateUserInformation.persona.domicilio.colonia);
    });
  });

  describe('[DELETE] /api/v1/usuarios/:{id}', () => {
    it('should ', async () => {
      const { token: dataa } = await createUserAndToken(createUserInitial);
      // eslint-disable-next-line no-console
      console.log(dataa);
    });
    it('should a user delete', async () => {
      await api.delete(`/api/v1/usuarios/${id}`).set(headers);
      const { deletedAt } = await models.Usuario.findByPk(id);
      expect(deletedAt).not.toBeNull();
    });
  });

  afterAll(async () => {
    await downSeed();
    await downServer();
  });
});
