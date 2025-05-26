const { alumno } = require('./properties/alumno');
const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const createAlumno = {
  tags: ['Alumnos'],
  description: 'Dado un objeto con los datos requeridos de un Alumno, guarda por primera vez a un nuevo Alumno en la base de datos.',
  querystring: {
    type: 'object',
    properties: { rvoe: { type: 'string' } },
    required: ['rvoe'],
  },
  body: {
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
          required: ['nombre', 'apellidoPaterno', 'fechaNacimiento', 'sexo', 'nacionalidad', 'curp', 'celular', 'correoPrimario'],
        },
      },
      required: ['matricula', 'persona'],
    },
  },
  examples: {
    'Alumno de ejemplo': {
      value: {
        matricula: 'A12345678',
        persona: {
          nombre: 'Juan',
          apellidoPaterno: 'Pérez',
          apellidoMaterno: 'Gómez',
          fechaNacimiento: '2000-01-15',
          nacionalidad: 'Mexicana',
          celular: '5551234567',
          curp: 'PEMJ000115HDFGRN09',
          sexo: 'Masculino',
          correoPrimario: '@example.com',
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
};

module.exports = { createAlumno };
