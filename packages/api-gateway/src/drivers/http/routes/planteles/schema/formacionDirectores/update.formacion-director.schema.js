const { formacion } = require('../../../instituciones/schema/formacionesRectores/properties/formacion');
const { formacionDirector } = require('./properties/formacionDirector');
const { responseProperties } = require('../properties/responseProperties');

const updateFormacionDirectorSchema = {
  tags: ['Formacion'],
  description: 'Update the information for the formation of a director. It is created with the information from an object.',
  params: {
    type: 'object',
    properties: {
      ...formacionDirector,
    },
    required: ['directorId', 'formacionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...formacion,
    },
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

module.exports = { updateFormacionDirectorSchema };
