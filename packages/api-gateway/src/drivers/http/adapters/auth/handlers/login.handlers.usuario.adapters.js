// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function loginUser(req, reply) {
  try {
    const { user } = req;
    Logger.info(`[auth]: User Logged in: ${user.usuario}`);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: user });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = loginUser;
