const { plantel } = require('./properties/plantel');
const { domicilio } = require('./properties/domicilio');
const { municipio } = require('./properties/municipio');
const { estado } = require('./properties/estado');
const { responseProperties } = require('./properties/responseProperties');

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
      domicilio: {
        type: 'object',
        properties: {
          ...domicilio,
        },
        required: ['municipioId', 'estadoId', 'calle', 'numeroExterior', 'colonia', 'codigoPostal'],
      },
    },
    required: ['domicilio', 'tipoInmuebleId', 'correo1', 'correo2'],
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
          },
        },
      },
    },
  },
};

module.exports = createPlantelSchema;
