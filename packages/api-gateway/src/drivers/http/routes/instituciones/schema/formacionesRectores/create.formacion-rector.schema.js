const { formacion } = require('./properties/formacion');
const { formacionRector } = require('./properties/formacionRector');
const { responseProperties } = require('../properties/responseProperties');

const createFormacionRectorSchema = {
  tags: ['Formacion'],
  description: 'Create the information for the formation of a rector. It is created with the information from an object.',
  params: {
    type: 'object',
    properties: {
      ...formacionRector.rectorId,
    },
    required: ['rectorId'],
  },
  body: {
    type: 'object',
    properties: {
      ...formacion,
    },
    required: ['nivelId', 'nombre', 'institucion', 'fechaGraduado'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...formacion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createFormacionRectorSchema };
