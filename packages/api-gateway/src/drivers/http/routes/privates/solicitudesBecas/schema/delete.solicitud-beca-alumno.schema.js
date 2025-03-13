const { solicitudBecaAlumno } = require('./properties/solicitudBecaAlumno');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { estatusAlumnoBeca } = require('./properties/estatusAlumnoBeca');

const deleteSolicitudBecaAlumnoSchema = {
  tags: ['Solicitudes Becas Alumnos'],
  description: 'Este endpoint elimina una solicitud de becas alumnos y devuelve un objeto que contiene los detalles del alumno eliminado',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudBecaAlumno,
            ...responseProperties,
            estatusAlumnoBeca: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusAlumnoBeca,
                ...responseProperties,
              },
            },
            cicloEscolar: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...cicloEscolar,
                ...responseProperties,
              },
            },
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = deleteSolicitudBecaAlumnoSchema;
