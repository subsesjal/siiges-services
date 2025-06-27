const { alumno } = require('../../../external/alumnos/schema/properties/alumno');
const { persona } = require('../../../external/alumnos/schema/properties/persona');
const { responseProperties } = require('../../../external/alumnos/schema/properties/responseProperties');

const findAlumnoTitulo = {
  tags: ['Alumnos'],
  description: 'Dado un folio del titulo de un Alumno, muestro los datos de un titulo electronico digital.',
  querystring: {
    type: 'object',
    properties: { folioControl: { type: 'string' } },
    required: ['folioControl'],
  },
  body: {
    type: 'object',
    properties: {
      folioControl: { type: 'string' },
      alumnos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...alumno,
            persona: {
              type: 'object',
              properties: {
                ...persona,
              },
              required: [
                'nombre',
                'apellidoPaterno',
                'fechaNacimiento',
                'sexo',
                'nacionalidad',
                'curp',
                'celular',
                'correoPrimario',
              ],
            },
          },
          required: ['matricula', 'persona'],
        },
      },
    },
    required: ['folioControl', 'alumnos'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            successes: { type: 'integer' },
            failures: { type: 'integer' },
            alumnos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  error: { nullable: true },
                  alumno: {
                    type: 'object',
                    properties: {
                      ...alumno,
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
      },
    },
  },
};

module.exports = { findAlumnoTitulo };
