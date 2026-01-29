const { asignaturaAntecedenteEquivalente } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaEquivalentePrograma');
const { asignatura } = require('../../../privates/asignaturas/schema/properties/asignatura');
const { responseProperties } = require('../../../privates/solicitudesRevEquiv/schema/properties/responseProperties');

const updateAsignaturaAntecedenteEquivalenteSchema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'Actualiza una Asignatura para el antecddente academico, on asignatura id o sin asignatura id',
  body: {
    type: 'object',
    properties: {
      ...asignaturaAntecedenteEquivalente,
    },
    required: [
      'nombreAsignaturaEquivalente',
      'calificacionEquivalente',
      'nombreAsignaturaAntecedente',
      'calificacionAntecedente',
    ],
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

module.exports = updateAsignaturaAntecedenteEquivalenteSchema;
