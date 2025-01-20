const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');

const createSolicitudFolioSchema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'Given an object with solicitud equivalencia the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: {
      ...solicitudRevEquiv,
    },
    required: [
      'interesadoId',
      'nombreAsignaturaEquivalente',
      'calificacionEquivalente',
      'nombreAsignaturaAntecedente',
      'calificacionAntecedente',
    ],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            interesadoId: { type: 'integer' },
            nombreAsignaturaEquivalente: { type: 'string' },
            calificacionEquivalente: { type: 'string' },
            nombreAsignaturaAntecedente: { type: 'string' },
            calificacionAntecedente: { type: 'string' },
            asignaturaId: { type: ['integer', 'null'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
            asignaturaEquivalentePrograma: {
              type: 'object',
              properties: {
                asignaturaAntecedenteEquivalenteId: { type: 'integer' },
                asignaturaId: { type: 'integer' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time', nullable: true },
                deletedAt: { type: 'string', format: 'date-time', nullable: true },
                asignatura: {
                  type: 'object',
                  properties: {
                    programaId: { type: 'integer' },
                    gradoId: { type: 'integer' },
                    areaId: { type: 'integer' },
                    academia: { type: 'string', nullable: true },
                    consecutivo: { type: 'integer' },
                    nombre: { type: 'string' },
                    clave: { type: 'string' },
                    seriacion: { type: 'string', nullable: true },
                    objetivo: { type: 'string', nullable: true },
                    temas: { type: 'string', nullable: true },
                    actividades: { type: 'string', nullable: true },
                    modeloInstruccional: { type: 'string', nullable: true },
                    horasDocente: { type: 'integer' },
                    horasIndependiente: { type: 'integer' },
                    creditos: { type: 'integer' },
                    tipo: { type: 'integer' },
                    fechaAutorizacion: { type: 'string', format: 'date-time' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time', nullable: true },
                    deletedAt: { type: 'string', format: 'date-time', nullable: true },
                  },
                  additionalProperties: false,
                },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
};

module.exports = createSolicitudFolioSchema;
