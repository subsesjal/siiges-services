const { organoColegiado } = require('./properties/organoColegiado');
const { sesion } = require('./properties/sesion');
const { periodo } = require('./properties/periodo');
const { responseProperties } = require('./properties/responseProperties');

const findGroupOrgColegiadosSchema = {
  tags: ['Organos Colegiados'],
  description: 'Get a group Organos Colegiados by Institución.',
  params: {
    type: 'object',
    properties: { institucionId: { type: 'integer' } },
    required: ['institucionId'],
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
              ...organoColegiado,
              ...responseProperties,
              sesion: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...sesion,
                  ...responseProperties,
                },
              },
              periodo: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...periodo,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { findGroupOrgColegiadosSchema };
