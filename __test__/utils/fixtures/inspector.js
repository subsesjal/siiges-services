const { createUserDb } = require('./server');
const { models } = require('../../../packages/core/src/drivers/db/connection');

const createUserInspector = {
  usuario: 'inspector',
  rolId: 6,
  correo: 'inspector@gmail.com',
  contrasena: 'Qwerty1234@',
};
const createInpector = async () => {
  const { personaId } = await createUserDb(createUserInspector);
  const inspector = await models.Inspector.create({ personaId });
  return inspector;
};

module.exports = { createInpector };
