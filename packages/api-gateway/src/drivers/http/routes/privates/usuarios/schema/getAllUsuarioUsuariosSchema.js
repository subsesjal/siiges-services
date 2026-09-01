const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('./properties/usuario');
const { rol } = require('./properties/rol');

const getAllUsuariosSchema = {
  tags: ['Usuario'],
  description: 'Return a list of users related to a user.',
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'integer', minimum: 0, default: 0,
      },
      limit: {
        type: 'integer', minimum: 1, maximum: 100, default: 10,
      },
      search: {
        type: 'string', default: '',
      },
      sortBy: {
        type: 'string',
        enum: ['id', 'nombre', 'usuario', 'correo', 'rol', 'estatus', 'fecha'],
        default: 'id',
      },
      sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
    },
  },
  params: {
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
    },
    required: ['usuarioId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...usuario,
              ...responseProperties,
              rol: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...rol,
                  ...responseProperties,
                },
              },
              persona: {
                type: 'object',
                properties: {
                  ...persona,
                  ...responseProperties,
                },
              },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            total: { type: 'integer' },
            totalPages: { type: 'integer' },
            sortBy: { type: 'string' },
            sortOrder: { type: 'string' },
            search: { type: 'string' },
          },
          required: ['page', 'limit', 'total', 'totalPages', 'sortBy', 'sortOrder', 'search'],
        },
      },
    },
  },
};

module.exports = getAllUsuariosSchema;
