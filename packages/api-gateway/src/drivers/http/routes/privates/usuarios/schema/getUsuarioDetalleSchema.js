const { usuario } = require('./properties/usuario');
const { rol } = require('./properties/rol');
const { persona } = require('./properties/persona');
const { domicilio } = require('./properties/domicilio');
const { municipio } = require('./properties/municipio');
const { estado } = require('./properties/estado');
const { responseProperties } = require('./properties/responseProperties');

const getUsuarioDetalleSchema = {
  tags: ['Usuario'],
  description: 'Given an user id, then return a user of database.',
  params: {
    title: 'getUsuarioDetalleSchema',
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
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
                domicilio: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...domicilio,
                    ...responseProperties,
                    municipio: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...municipio,
                        ...responseProperties,
                      },
                    },
                    estado: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...estado,
                        ...responseProperties,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = getUsuarioDetalleSchema;
