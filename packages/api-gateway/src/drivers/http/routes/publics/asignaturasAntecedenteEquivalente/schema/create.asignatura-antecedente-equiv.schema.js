const { asignaturaAntecedenteEquivalente } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('../../../privates/solicitudesRevEquiv/schema/properties/asignaturaEquivalentePrograma');
const { asignatura } = require('../../../privates/asignaturas/schema/properties/asignatura');
const { responseProperties } = require('../../../privates/solicitudesRevEquiv/schema/properties/responseProperties');

const createAsignaturaAntecedenteEquivalenteSchema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'Crear una Asignatura para el antecddente academico, on asignatura id o sin asignatura id',
  body: {
    type: 'object',
    properties: {
      ...asignaturaAntecedenteEquivalente,
    },
    required: [
      'interesadoId',
      'nombreAsignaturaEquivalente',
      'calificacionEquivalente',
      'nombreAsignaturaAntecedente',
      'calificacionAntecedente',
    ],
  },
  response: {
    201: {
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

module.exports = createAsignaturaAntecedenteEquivalenteSchema;
