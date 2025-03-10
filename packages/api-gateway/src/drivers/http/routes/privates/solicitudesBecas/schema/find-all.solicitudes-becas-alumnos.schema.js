const { solicitudBecaAlumno } = require('./properties/solicitudBecaAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { grado } = require('../../grupos/schema/properties/grado');
const { estatusAlumnoBeca } = require('./properties/estatusAlumnoBeca');
const { tipoAlumnoBeca } = require('./properties/tipoAlumnoBeca');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesBecasAlumnosSchema = {
  tags: ['Solicitudes Becas Alumno'],
  description: 'Este endpoint devuelve un arreglo de objetos, donde cada objeto contiene los detalles de una solicitud de beca de un alumno, incluyendo información del alumno, grado, estatus de la beca y tipo de beca.',
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
              estatusSolicitudBeca: {
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
  },
};

module.exports = findAllSolicitudesBecasAlumnosSchema;
