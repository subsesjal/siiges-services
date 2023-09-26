/* eslint-disable max-len */
const { fastify } = require('../../../packages/api-gateway/src/drivers/http/server');
const { config } = require('../../../packages/api-gateway/config/environment');
const { models } = require('../../../packages/core/src/drivers/db/connection');

const apiKey = {
  api_key: process.env.API_KEY,
};

/**
 * Update token and create headers with api_key
 * @param {String} token Token information after authentication
 * @returns Headers information whit params api_key and token
 * @example
 * {
 *  api_key: 'anvjinaun283rjw8jjiwsev',
 *  Authorization: 'Bearer mocaso93qjq9osa',
 * }
 */
const updateToken = (token) => {
  const headers = { ...apiKey, Authorization: `Bearer ${token}` };
  return headers;
};

const upServer = async () => fastify.listen(
  {
    port: config.serverPort,
    host: config.serverHost,
  },
);

const downServer = async () => {
  await fastify.close();
};

/**
 * @constant {Object} statusCodeName - Mapeo de nombres de códigos de estado a sus valores numéricos correspondientes.
 * @property {number} ok - Código de estado para indicar una solicitud exitosa (200).
 * @property {number} created - Código de estado para indicar que un recurso ha sido creado con éxito (201).
 * @property {number} badRequest - Código de estado para indicar una solicitud incorrecta o mal formada (400).
 * @property {number} unauthorized - Código de estado para indicar que la autenticación es requerida y ha fallado o no ha sido proporcionada (401).
 * @property {number} forbidden - Código de estado para indicar que el cliente no tiene permiso para acceder al recurso solicitado (403).
 * @property {number} notFound - Código de estado para indicar que el recurso solicitado no se ha encontrado (404).
 * @property {number} conflict - Código de estado para indicar que la solicitud no se pudo completar debido a un conflicto en el estado actual del recurso (409).
 */
const statusCodeName = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

const createUserDb = async (data) => {
  const usuario = await fastify.usuarioServices.createUser(data);
  return usuario;
};

const getToken = async (data) => {
  const { nombre: rol } = await models.Rol.findByPk(data.rolId);
  const userPayload = { id: data.id, rol, usuario: data.usuario };
  const token = fastify.jwt.sign({ userPayload });
  return token;
};

const createUserAndToken = async (data) => {
  const user = await createUserDb(data);
  const token = await getToken(user);
  const headers = updateToken(token);
  return { user, token, headers };
};

module.exports = {
  apiKey,
  updateToken,
  upServer,
  downServer,
  statusCodeName,
  createUserDb,
  getToken,
  createUserAndToken,
};
