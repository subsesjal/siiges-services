const { formacion } = require('../../../instituciones/schema/formacionesRectores/properties/formacion');
const { formacionDirector } = require('./properties/formacionDirector');
const { responseProperties } = require('../properties/responseProperties');

const createFormacionDirectorSchema = {
  tags: ['Formacion'],
  description: 'Create the information for the formation of a director. It is created with the information from an object.',
  params: {
    type: 'object',
    properties: {
      directorId: formacionDirector.directorId,
    },
    required: ['directorId'],
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

module.exports = { createFormacionDirectorSchema };
