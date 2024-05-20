const { createUserAndToken } = require('./server');
// const { models } = require('../../../packages/core/src/drivers/db/connection');

const createUserInspector = {
  usuario: 'inspector',
  rolId: 6,
  correo: 'inspector@gmail.com',
  contrasena: 'Qwerty1234@',
};

const solicitud = {
  programaId: 3,
  estatusInspeccionId: 1,
  fechaAsignada: '2022-10-28T15:24:07.000Z',
  folio: 'LI3032345',
};

const inspectorProgramas = {
  programaId: 3,
  inspectorId: 1,
  estatusInspeccionId: 1,
  fechaAsignada: '2024-10-28T15:24:07.000Z',
  folio: 'SUBSES.DISE.21.374',
};

const inspectorProgramasError = {
  programaId: 3,
  inspectorId: 1,
  inspeccionId: 100,
};

const createInpector = async () => {
  const inspector = await createUserAndToken(createUserInspector);
  // const inspector = await models.Inspector.create({ personaId });
  return inspector;
};

module.exports = {
  createInpector,
  solicitud,
  inspectorProgramas,
  inspectorProgramasError,
};
