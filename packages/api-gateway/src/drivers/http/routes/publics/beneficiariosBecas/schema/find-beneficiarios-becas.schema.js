const findBeneficiariosBecasSchema = {
  tags: ['Beneficiarios Becas Public'],
  description: 'Search beneficiarios becas catalog by correo.',
  querystring: {
    type: 'object',
    required: ['correo'],
    properties: {
      correo: { type: 'string' },
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
            additionalProperties: true,
          },
        },
        headers: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  },
};

module.exports = findBeneficiariosBecasSchema;
