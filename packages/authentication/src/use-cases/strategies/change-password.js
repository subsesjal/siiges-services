// const crypto = require('crypto');
const boom = require('@hapi/boom');
const { encrypStringHmacAlgorithm, matchHmacPassword } = require('../../adapters/strategies/auth.match-password.adapter');

/**
 * Changes the password for a specified user by encrypting the new password
 * and updating it in the database.
 *
 * @param {number} userId - The unique identifier of the user whose password is to be changed.
 * @param {string} password - The new password to be set for the user.
 * @param {Function} updateUserPasswordQuery - A function to execute
 * the database query for updating the user's password.
 */
const changePassword = async (userId, password, updateUserPasswordQuery) => {
  const newPassword = encrypStringHmacAlgorithm(password);

  const updatePassword = await updateUserPasswordQuery(
    { id: userId },
    { contrasena: newPassword, actualizado: 1 },
  );
  return {
    userId: updatePassword.id,
    correo: updatePassword.correo,
    user: updatePassword.usuario,
  };
};

/**
 * Changes a user's password using a recovery token.
 *
 * @param {Function} updateTokenRecoveryPasswordQuery - Function to
 * update the token recovery password status.
 * @param {Function} updateUserQuery - Function to update the user's password in the database.
 * @returns {(params: { token: string, password: string }) => Promise<{
    userId: any;
    correo: any;
    user: any;
}>} - An asynchronous
 * function that accepts an object with a token and a new password.
 *
 * The function retrieves the token recovery password record using the provided token,
 * changes the user's password, marks the token as used, and returns a success message.
 *
 * @example
 * const updateTokenRecoveryPasswordQuery = async (identifierObj, updateObj) => { ... };
 * const updateUserQuery = async (identifierObj, updateObj) => { ... };
 * const changePasswordByMail = changePasswordByMail(updateTokenRecoveryPasswordQuery,
 * updateUserQuery);
 *
 * const result = await changePasswordByMail({ token: 'some-token', password: 'new-password' });
 * console.log(result); // { message: 'Password updated' }
 *
 * @typedef {Object} TokenRecoveryPassword
 * @property {number} userId - The unique identifier of the user associated with the token.
 *
 * @param {Object} params - The parameters for changing the password.
 * @param {string} params.token - The recovery token.
 * @param {string} params.password - The new password to be set for the user.
 */
const changePasswordByMail = (
  updateTokenRecoveryPasswordQuery,
  updateUserQuery,
  findOneTokenRecoveryPassword,
) => async ({ token, newPassword }) => {
  const { userId } = await findOneTokenRecoveryPassword({ token });

  const updatedUser = await changePassword(userId, newPassword, updateUserQuery);
  await updateTokenRecoveryPasswordQuery({ token }, { isUsed: true });
  return updatedUser;
};

const changePasswordByUserId = (
  updateUserPasswordQuery,
  findOneUserQuery,
) => async ({ userId, oldPassword, newPassword }) => {
  const user = await findOneUserQuery({ id: userId });
  if (!user) {
    throw boom.notFound(`User with id: ${userId} not found`);
  }
  if (!matchHmacPassword(oldPassword, user.contrasena)) {
    throw boom.badRequest('Invalid password');
  }

  return changePassword(userId, newPassword, updateUserPasswordQuery);
};

module.exports = { changePasswordByMail, changePasswordByUserId };
