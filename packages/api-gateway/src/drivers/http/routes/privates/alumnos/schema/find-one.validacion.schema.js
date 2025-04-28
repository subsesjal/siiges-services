const { validacion } = require('./properties/validacion');
const { tipoValidaciones } = require('./properties/tipoValidacion');
const { situacionesValidacion } = require('./properties/situacionValidacion');
const { responseProperties } = require('./properties/responseProperties');

const { alumnoId } = validacion;

const findOneValidacionSchema = {
  tags: ['Alumnos'],
  description: 'Given an Alumno validate id, then return a Alumno from database.',
  params: {
    type: 'object',
    properties: { alumnoId },
    required: ['alumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...validacion,
            observaciones: { type: 'string' },
            tipo: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...tipoValidaciones,
              },
            },
            situacionValidacion: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...situacionesValidacion,
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { findOneValidacionSchema };
