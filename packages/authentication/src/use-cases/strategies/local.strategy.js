const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');

const localStrategy = (adapter, findOneUserQuery) => async (identifierObj) => {
  const { usuario, contrasena } = identifierObj;
  const include = [{ association: 'rol' }];
  const usuarioFound = await findOneUserQuery({ usuario }, { include });
  checkers.throwErrorIfDataIsFalsy(usuarioFound, 'usuarios', usuario);

  if (!usuarioFound) {
    throw boom.unauthorized();
  }

  if (!usuarioFound.dataValues.estatus) {
    throw boom.unauthorized();
  }

  if (usuarioFound.dataValues.actualizado
    ? !adapter.matchHmacPassword(contrasena, usuarioFound.dataValues.contrasena)
    : !adapter.matchHashPassword(contrasena, usuarioFound.dataValues.contrasena)
  ) {
    throw boom.unauthorized();
  }

  delete usuarioFound.dataValues.contrasena;

  return usuarioFound;
};

module.exports = localStrategy;
