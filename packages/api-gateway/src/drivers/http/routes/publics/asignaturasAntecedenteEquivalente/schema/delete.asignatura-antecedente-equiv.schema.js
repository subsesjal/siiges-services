const { asignaturaAntecedenteEquivalente } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaEquivalentePrograma');
const { asignatura } = require('../../../privates/asignaturas/schema/properties/asignatura');
const { responseProperties } = require('../../../privates/solicitudesRevEquiv/schema/properties/responseProperties');

const deleteAsignaturaAntecedenteEquivalenteSchema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'Obtener una asignatura antecedente equivalente por id',
  params: {
    type: 'object',
    properties: {
      asignaturaAntecedenteEquivalenteId: { type: 'integer' },
    },
    required: ['asignaturaAntecedenteEquivalenteId'],
  },

  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...asignaturaAntecedenteEquivalente,
            ...responseProperties,
            asignaturaEquivalentePrograma: {
              type: 'object',
              properties: {
                ...asignaturaEquivalentePrograma,
                ...responseProperties,
                asignatura: {
                  type: 'object',
                  properties: {
                    ...asignatura,
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

module.exports = deleteAsignaturaAntecedenteEquivalenteSchema;
