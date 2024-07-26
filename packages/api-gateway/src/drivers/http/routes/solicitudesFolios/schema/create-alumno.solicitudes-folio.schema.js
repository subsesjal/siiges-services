const { responseProperties } = require('./properties/responseProperties');

const createAlumnoFolioSchema = {
  tags: ['Agregar una solicitud folio a un alumno'],
  description: 'Given an object with solicitud folio required data, then save the first time a new solicitudes_folios_alumnos in database.',
  body: {
    type: 'object',
    properties: {
      fechaTermino: { type: 'string', format: 'date-time' },
      fechaElaboracion: { type: 'string', format: 'date-time' },
    },
    required: ['fechaTermino', 'fechaElaboracion'],
  },
  response: {
    201: {
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
              type: 'object',
              properties: {
                id: { type: 'integer' },
                persona: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string' },
                    apellidoPaterno: { type: 'string' },
                    apellidoMaterno: { type: 'string' },
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

module.exports = createAlumnoFolioSchema;
