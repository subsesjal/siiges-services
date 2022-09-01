// External dependencies
const boom = require('@hapi/boom');
const { models } = require('@siiges-services/core');
const { Logger } = require('@siiges-services/shared');

async function getUserByUsername(usuario) {
  const user = await models.Usuario.findOne({ where: { usuario } });
  if (user) return user.dataValues;

  Logger.error(`[auth/getUserByUsername]: Unable to find \
username ${usuario} in our database`);
  throw boom.notFound(`Unable to find username ${usuario} in our database`);
}

module.exports = getUserByUsername;
