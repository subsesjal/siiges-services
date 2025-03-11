const { solicitudBecaAlumno } = require('./properties/solicitudBecaAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { grado } = require('../../grupos/schema/properties/grado');
const { estatusAlumnoBeca } = require('./properties/estatusAlumnoBeca');
const { tipoAlumnoBeca } = require('./properties/tipoAlumnoBeca');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudBecaAlumnoSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Crea una nueva solicitud de beca para un alumno. Se debe enviar el ID de la solicitud de beca en el params y los datos del alumno en el body.',
  params: {
    type: 'object',
    properties: {
      solicitudBecaId: { type: 'integer' },
    },
    required: ['solicitudBecaId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudBecaAlumno,
    },
    required: [
      'estatusAlumnoBecaId',
      'tipoAlumnoBecaId',
      'alumnoId',
      'gradoId',
      'promedio',
      'porcentajeBeca',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudBecaAlumno,
            ...responseProperties,
            alumno: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...alumno,
                ...responseProperties,
              },
            },
            grado: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...grado,
                ...responseProperties,
              },
            },
            estatusAlumnoBeca: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusAlumnoBeca,
                ...responseProperties,
              },
            },
            tipoAlumnoBeca: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...tipoAlumnoBeca,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudBecaAlumnoSchema;
