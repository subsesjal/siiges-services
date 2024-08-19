const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Given an object with solicitud folio required data, then update a solicitud in database.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
    },
    required: ['solicitudFolioId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            properties: {
              ...solicitudFolioAlumno,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudFolioSchema;
