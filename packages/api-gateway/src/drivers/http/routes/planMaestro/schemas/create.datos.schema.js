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
  description: 'Create responsables.',
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
      contratoYCalendario: {
        type: 'object',
        properties: {
          ...contratoYContrato,
        },
      },
      tipoDeProyecto: {
        type: 'object',
        properties: {
          ...TipoDeProyecto,
        },
      },
      espacioDeEquipamento: {
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
            contratoYCalendario: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...contratoYContrato,
                ...responseProperties,
              },
            },
            tipoDeProyecto: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...TipoDeProyecto,
                ...responseProperties,
              },
            },
            espacioDeEquipamento: {
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
