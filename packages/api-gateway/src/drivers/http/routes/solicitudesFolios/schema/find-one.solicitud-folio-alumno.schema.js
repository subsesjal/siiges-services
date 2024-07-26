const { solicitudFolioAlumnos } = require('./properties/solicitudFolioAlumnos');
const { responseProperties } = require('./properties/responseProperties');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');

const findOneAlumnoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return an object alumno.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioAlumnoId: { type: 'integer' },
    },
    required: ['solicitudFolioAlumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...solicitudFolioAlumnos,
            ...responseProperties,
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
};

module.exports = findOneAlumnoSchema;
