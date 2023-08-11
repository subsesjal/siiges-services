const supertest = require('supertest');
const {
  apiKey,
  upServer,
  downServer,
  statusCodeName,
} = require('./utils/fixtures/server');
const { upSeed, downSeed } = require('./utils/umzug');
const { createInpector } = require('./utils/fixtures/inspector');

describe('Test for inspectores', () => {
  let api = null;
  let inspector = null;
  beforeAll(async () => {
    api = supertest(await upServer());
    await upSeed();
    inspector = await createInpector();
  }, 100000);
  describe('[POST] /api/v1/inspecciones/inspectores-programas', () => {
    it('should new inspector program', async () => {
      const { statusCode, body } = await api.post('/api/v1/inspecciones/inspectores-programas')
        .send({ inspectorId: inspector.id, programaId: 1 })
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.created);
      expect(body.data.inspectorId).toEqual(inspector.id);
    });
    it('should a error', async () => {
      const { statusCode } = await api.post('/api/v1/inspecciones/inspectores-programas')
        .send({ inspectorId: inspector.id, programaId: 100 })
        .set(apiKey);
      expect(statusCode).toEqual(statusCodeName.notFound);
    });
  });
  afterAll(async () => {
    await downSeed();
    await downServer();
  });
});
