const updateManyProgramasSchema = {
  tags: ['Programas'],
  description: 'Bulk update permisoAlumno for a set of Programas by explicit ids.',
  body: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: { type: 'integer' },
        minItems: 1,
      },
      permisoAlumno: { type: 'boolean' },
    },
    required: ['ids', 'permisoAlumno'],
    additionalProperties: false,
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
              id: { type: 'integer' },
              permisoAlumno: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
};

module.exports = { updateManyProgramasSchema };
