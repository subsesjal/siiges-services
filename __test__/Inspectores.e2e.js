const supertest = require('supertest');
const {
  upServer,
  downServer,
  statusCodeName,
} = require('./utils/fixtures/server');
const { upSeed, downSeed } = require('./utils/umzug');
const {
  createInpector,
  solicitud,
  inspectorProgramas,
  inspectorProgramasError,
} = require('./utils/fixtures/inspector');

describe('Test for inspectores', () => {
  let api = null;
  let inspector = null;
  beforeAll(async () => {
    api = supertest(await upServer());
    await upSeed();
    inspector = await createInpector();
  });
  describe('[POST] /api/v1/inspecciones', () => {
    it('should a new Solicitud', async () => {
      const { statusCode, body } = await api.post('/api/v1/inspecciones')
        .send(solicitud)
        .set(inspector.headers);
      expect(statusCode).toEqual(statusCodeName.created);
      expect(body.data.folio).toEqual(solicitud.folio);
    });
  });
  describe('[POST] /api/v1/inspecciones/inspectores-programas', () => {
    it('should new inspector program', async () => {
      const { statusCode, body } = await api.post('/api/v1/inspecciones/inspectores-programas')
        .send(inspectorProgramas)
        .set(inspector.headers);
      expect(statusCode).toEqual(statusCodeName.created);
      expect(body.data.programaId).toEqual(inspectorProgramas.programaId);
    });
    it('should a error', async () => {
      const { statusCode } = await api.post('/api/v1/inspecciones/inspectores-programas')
        .send(inspectorProgramasError)
        .set(inspector.headers);
      expect(statusCode).toEqual(statusCodeName.conflict);
    });
  });
  describe('[GET] /api/v1/inspecciones/inspectores-programass', () => {
    it('should a new Solicitud', async () => {
      const { statusCode, body } = await api.get('/api/v1/inspecciones/inspectores-programas')
        .set(inspector.headers);
      expect(statusCode).toEqual(statusCodeName.ok);
      expect(body.data[0].inspeccionesPendientes).toEqual(1);
    });
  });
  afterAll(async () => {
    await downSeed();
    await downServer();
  });
});
