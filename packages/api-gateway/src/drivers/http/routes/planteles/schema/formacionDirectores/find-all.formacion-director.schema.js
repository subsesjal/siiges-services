const { formacion } = require('../../../instituciones/schema/formacionesRectores/properties/formacion');
const { formacionDirector } = require('./properties/formacionDirector');
const { responseProperties } = require('../properties/responseProperties');

const findAllFormacionDirectorSchema = {
  tags: ['Formacion'],
  description: 'Get all the formations of a director in institutions.',
  params: {
    type: 'object',
    properties: {
      directorId: formacionDirector.directorId,
    },
    required: ['directorId'],
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
              ...formacion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllFormacionDirectorSchema };
