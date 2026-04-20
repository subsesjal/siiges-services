const findOneRepresentanteLegalSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Consulta un representante legal por CURP en la API externa de títulos',
  params: {
    type: 'object',
    properties: {
      curp: { type: 'string' },
    },
    required: ['curp'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            curp: { type: 'string' },
            nombre: { type: 'string' },
            primerApellido: { type: 'string' },
            segundoApellido: { type: 'string' },
            email: { type: 'string' },
            titulo: { type: 'string' },
            instituciones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  cveInstitucion: { type: 'string' },
                  nombreInstitucion: { type: 'string' },
                  cargo: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneRepresentanteLegalSchema;
