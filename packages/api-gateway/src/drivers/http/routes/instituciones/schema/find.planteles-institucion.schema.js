const { institucion } = require('./properties/institucion');
const { plantel } = require('./properties/plantel');
const { domicilio } = require('./properties/domicilio');
const { municipio } = require('./properties/municipio');
const { estado } = require('./properties/estado');
const { responseProperties } = require('./properties/responseProperties');

const findPlantelesInstitucionSchema = {
  tags: ['Plantel'],
  description: 'Given a institucion id, then return a institucion and its planteles of database.',
  params: {
    title: 'getInstitucionPlantelesSchema',
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuarioId: { type: 'integer' },
            ...institucion,
            ...responseProperties,
            planteles: {
              type: 'array',
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
  },
};

module.exports = findPlantelesInstitucionSchema;
