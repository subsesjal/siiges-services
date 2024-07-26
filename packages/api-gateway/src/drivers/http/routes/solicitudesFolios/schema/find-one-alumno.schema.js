const { alumno } = require('./properties/alumno');
const { responseProperties } = require('./properties/responseProperties');

const findOneAlumnoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return an object alumno.',
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            alumnoId: { type: 'integer' },
            solicitudFolioId: { type: 'integer' },
            fechaTermino: { type: 'string', format: 'date-time' },
            fechaElaboracion: { type: 'string', format: 'date-time' },
            ...responseProperties,
            alumno: {
              ...alumno,
            },
          },
        },
      },
    },
  },
};

module.exports = findOneAlumnoSchema;
