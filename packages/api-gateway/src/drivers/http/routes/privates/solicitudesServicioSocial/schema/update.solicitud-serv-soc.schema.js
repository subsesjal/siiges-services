const { solicitudServicioSocial } = require('./properties/solicitudServicioSocial');
const { estatusSolicitudServicioSocial } = require('./properties/estatusSolicitudServicioSocial');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('../../usuarios/schema/properties/usuario');

const updateSolicitudServSocSchema = {
  tags: ['Solicitudes Servicio Social'],
  description:
    'Actualiza los datos de una solicitud de Servicio Social con el ID proporcionado. Se debe enviar la información actualizada en el cuerpo de la solicitud. El endpoint devuelve la solicitud actualizada en caso de éxito o un error en caso de fallos en la validación o en la base de datos.',
  body: {
    type: 'object',
    properties: {
      ...solicitudServicioSocial,
      estatusSolicitudServicioSocial: {
        type: 'object',
        properties: {
          estatusSolicitudServicioSocialId: { type: 'integer' },
        },
      },
      cicloEscolar: {
        type: 'object',
        properties: {
          cicloEscolarId: { type: 'integer' },
        },
      },
      domicilio: {
        type: 'object',
        properties: {
          ...domicilio,
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
            id: { type: 'integer' },
            ...solicitudServicioSocial,
            ...responseProperties,
            estatusSolicitudServicioSocial: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusSolicitudServicioSocial,
                ...responseProperties,
              },
            },
            cicloEscolar: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...cicloEscolar,
                ...responseProperties,
              },
            },
            domicilio: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...domicilio,
                ...responseProperties,
              },
            },
            usuario: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...usuario,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = updateSolicitudServSocSchema;
