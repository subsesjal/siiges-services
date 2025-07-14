const reportSolicitudFolioAlumnoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return a list of solicitudes folios titulo.',
  querystring: {
    type: 'object',
    required: ['fojaInicio', 'fojaFin', 'libro', 'tipoDocumento'],
    properties: {
      fojaInicio: { type: 'string' },
      fojaFin: { type: 'string' },
      libro: { type: 'string' },
      tipoDocumento: {
        type: 'string',
        enum: ['titulo', 'certificado'],
        description: 'El tipo de documento',
      },
    },
  },
};

module.exports = reportSolicitudFolioAlumnoSchema;
