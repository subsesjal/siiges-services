const { certificado } = require('./properties/certificado');

const findAllCertificadosSchema = {
  tags: ['Certificados Electrónicos'],
  description: 'Devuelve la lista de alumnos con certificado electrónico firmado, filtrados por número de RVOE.',
  querystring: {
    type: 'object',
    properties: {
      numeroRvoe: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ...certificado,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllCertificadosSchema;
