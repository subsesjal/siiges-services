const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { responseProperties } = require('../../usuarios/schema/properties/responseProperties');

const findGroupPlantelesUsuarioSchema = {
  tags: ['Plantel'],
  description: 'Given a user id, then return a the planteles related to the user of database.',
  params: {
    title: 'getPlantelesUsuarioSchema',
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
            properties: {
              id: { type: 'integer' },
              ...plantel,
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
};

module.exports = findGroupPlantelesUsuarioSchema;
