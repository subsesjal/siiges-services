const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { datos } = require('./properties/datos');
const { contratoYContrato } = require('./properties/contratoYCalendario');
const { TipoDeProyecto } = require('./properties/tipoDeProyecto');
const { espaciosDeEquipamiento } = require('./properties/espacioYEquipamiento');

const {
  planesMaestroId,
  montoNoContratado: ___,
  remanente,
  tipoDeProyectoId,
  contratoYCalendarioId,
  ...datosBody
} = datos;
const { datosDelProyectoId: __, ...espaciosDeEquipamientoBody } = espaciosDeEquipamiento;

const createDatosDeProyectoSchema = {
  tags: ['Planes Maestros'],
  description: 'Create datos for plan maestro.',
  params: {
    type: 'object',
    properties: {
      planMaestroId: { type: 'integer' },
    },
    required: ['planMaestroId'],
  },
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...datosBody,
      contrato: {
        type: 'object',
        properties: {
          ...contratoYContrato,
        },
      },
      tipoProyecto: {
        type: 'object',
        properties: {
          ...TipoDeProyecto,
        },
      },
      proyectoEspacio: {
        type: 'array',
        items: {
          properties: {
            ...espaciosDeEquipamientoBody,
          },
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...datos,
            contrato: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...contratoYContrato,
                ...responseProperties,
              },
            },
            tipoProyecto: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...TipoDeProyecto,
                ...responseProperties,
              },
            },
            proyectoEspacio: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...espaciosDeEquipamiento,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { createDatosDeProyectoSchema };
