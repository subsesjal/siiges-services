const { organoColegiado } = require('./properties/organoColegiado');
const { sesion } = require('./properties/sesion');
const { periodo } = require('./properties/periodo');
const { responseProperties } = require('./properties/responseProperties');

const findOneOrgColegiadoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Get one Org Colegiado.',
  params: {
    type: 'object',
    properties: { orgColegiadoId: { type: 'integer' } },
    required: ['orgColegiadoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
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
};

module.exports = { findOneOrgColegiadoSchema };
