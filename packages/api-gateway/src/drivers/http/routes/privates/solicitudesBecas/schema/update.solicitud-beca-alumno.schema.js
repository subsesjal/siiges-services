const { solicitudBecaAlumno } = require('./properties/solicitudBecaAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { grado } = require('../../grupos/schema/properties/grado');
const { estatusAlumnoBeca } = require('./properties/estatusAlumnoBeca');
const { responseProperties } = require('./properties/responseProperties');

const updateSolicitudBecaAlumnoSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Actualiza una solicitud de beca para un alumno específico. Se debe enviar el ID de la solicitud de beca y el ID de la solicitud de beca del alumno en los parámetros de la URL, junto con los datos a actualizar en el body.',
  params: {
    type: 'object',
    properties: {
      solicitudBecaId: { type: 'integer' },
      solicitudBecaAlumnoId: { type: 'integer' },
    },
    required: ['solicitudBecaId', 'solicitudBecaAlumnoId'],
  },
  body: {
    type: 'object',
    properties: {
      promedio: { type: 'number' },
      porcentajeBeca: { type: 'number' },
    },
    required: ['promedio', 'porcentajeBeca'],
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
          },
        },
      },
    },
  },
};

module.exports = updateSolicitudBecaAlumnoSchema;
