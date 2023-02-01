const { plantel } = require('./properties/plantel');
const { domicilio } = require('./properties/domicilio');
const { municipio } = require('./properties/municipio');
const { estado } = require('./properties/estado');
const { responseProperties } = require('./properties/responseProperties');
const { director } = require('./properties/director');
const { persona } = require('../../usuarios/schema/properties/persona');

const createPlantelSchema = {
  tags: ['Plantel'],
  description: 'Given an object with plantel required data, then save a plantel in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...plantel,
      director: {
        type: 'object',
        properties: {
          ...director,
          persona: {
            type: 'object',
            properties: {
              ...persona,
            },
            required: ['nombre', 'apellidoPaterno'],
          },
        },
        required: ['persona'],
      },
      domicilio: {
        type: 'object',
        properties: {
          ...domicilio,
        },
        required: ['municipioId', 'estadoId', 'calle', 'numeroExterior', 'colonia', 'codigoPostal'],
      },
    },
    required: ['domicilio', 'director', 'tipoInmuebleId', 'correo1', 'correo2'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
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
            director: {
              type: 'object',
              properties: {
                ...director,
                ...responseProperties,
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
        },
      },
    },
  },
};

module.exports = createPlantelSchema;
