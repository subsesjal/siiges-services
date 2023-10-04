const { formacion } = require('../../../instituciones/schema/formacionesRectores/properties/formacion');
const { formacionDirector } = require('./properties/formacionDirector');
const { responseProperties } = require('../properties/responseProperties');

const findOneFormacionDirectorSchema = {
  tags: ['Formacion'],
  description: 'Get details of a formation of a director in institutions.',
  params: {
    type: 'object',
    properties: {
      ...formacionDirector,
    },
    required: ['directorId', 'formacionId'],
  },
  response: {
    200: {
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

module.exports = { findOneFormacionDirectorSchema };
