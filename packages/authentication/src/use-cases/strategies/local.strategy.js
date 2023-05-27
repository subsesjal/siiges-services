const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');

const LocalStrategy = (adapter, findOneUserQuery) => new Strategy(async (
  usuario,
  password,
  done,
) => {
  try {
    const usuarioFound = await findOneUserQuery({ usuario });
    checkers.throwErrorIfDataIsFalsy(usuarioFound, 'usuarios', usuario);

    if (!usuarioFound) {
      done(boom.unauthorized(), false);
    }

    if (!usuarioFound.dataValues.estatus) {
      done(boom.unauthorized(), false);
    }

    if (usuarioFound.dataValues.actualizado
      ? !adapter.matchHmacPassword(password, usuarioFound.dataValues.contrasena)
      : !adapter.matchHashPassword(password, usuarioFound.dataValues.contrasena)
    ) {
      done(boom.unauthorized(), false);
    }

    delete usuarioFound.dataValues.contrasena;

    done(null, usuarioFound.dataValues);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
